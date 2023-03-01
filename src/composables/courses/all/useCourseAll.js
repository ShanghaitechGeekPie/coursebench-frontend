import { provide, reactive, ref, onMounted, inject, toRefs, watch, computed } from "vue"
import { instituteInfo } from "@/composables/global/useStaticData";
import useDebounce from "@/composables/global/useDebounce"
import useWatching from "@/composables/global/useWatching"
import useFetching from "@/composables/global/useFetching"
import { sortCmp, averageOf, notEqual } from "@/composables/global/useArrayUtils"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"
import { enoughDataThreshold } from "@/composables/global/useParseScore"

const baseStatistic = {
    total: 0,
    count: (() => {
        let ret = {}
        Object.keys(instituteInfo).filter(key => key !== '').forEach(key => {
            ret[key] = 0
        })
        return ret
    })(),
}

export default () => {

    const showSnackbar = inject("showSnackbar")
    const searchInput = inject("searchInput")
    const savedCourseAllStatus = inject("savedCourseAllStatus")
    const savedCourseAllFilterStatus = inject("savedCourseAllFilterStatus")



    const courseRawText = ref([])
    const courseText = computed(() => courseRawText.value.filter(course =>
      matchSearchCourse(course) && matchFilterCourse(course) && filterInvalidCourse(course)));
    const courseStatistic = computed(() => {
        const courseSearchedText = courseRawText.value.filter(matchSearchCourse);
        if (courseSearchedText.length === 0) {
            return baseStatistic
        }
        const res = { ...baseStatistic, count: { ...baseStatistic.count } }
        res.total = courseSearchedText.length
        const schools = Object.keys(res.count).filter((key) => key != "__ob__")
        for (let key in res.count) {
            res.count[key] = 0
        }
        for (let course of courseSearchedText) {
            if (schools.indexOf(course.institute) >= 0) {
                res.count[course.institute]++
            } else {
                res.count["其他学院"]++
            }
        }
        return res
    })



    const status = reactive({
        loading: true,
        ...toRefs(savedCourseAllStatus),
    })

    const courseFilterStatus = reactive({
        ...toRefs(savedCourseAllFilterStatus),
    })



    const getCourseAll = () => {
        const { status: fetchStatus, data, error } = useFetching(["course_all"], "/course/all")
        useWatching(fetchStatus, () => {
            if (fetchStatus.value === "success") {
                status.loading = false
            } else if (fetchStatus.value == "error") {
                status.loading = false
                if (isNetworkError(error.value.response)) {
                    showSnackbar("error", "网络连接错误")
                } else if (isValidErrorMessage(error.value.response.data.msg)) {
                    showSnackbar("error", error.value.response.data.msg)
                } else {
                    showSnackbar("error", "服务器发生错误")
                }
            }
        })
        useWatching(data, () => {
            if (data.value) {
                const schools = Object.keys(baseStatistic.count).filter(key => key != "__ob__")
                courseFilterStatus.selected = schools
                courseRawText.value = data.value.data.map((course) => {
                    if (schools.indexOf(course.institute) >= 0) {
                        return course
                    } else {
                        return { ...course, institute: "其他学院" }
                    }
                })
                courseRawText.value.sort(sortFunc)
            }
        })
    }


    const matchSearchKeys = (policyFunc) => {
        for (let i = 0; i < searchInput.keys.length; i++) {
            if (!policyFunc(searchInput.keys[i])) {
                return false;
            }
        }
        return true
    }

    const matchSearchCourse = (course) => {
        if (searchInput.keys.length === 0) {
            return true;
        } else if (searchInput.isRegexp) {
            return matchSearchKeys((key) => {
                return new RegExp(key).test(course.name) || new RegExp(key).test(course.code);
            })
        } else {
            return matchSearchKeys((key) => {
                return course.name.includes(key) || new String(course.code).includes(key);
            })
        }
    }

    const matchFilterCourse = (course) => courseFilterStatus.selected.some((item) => item === course.institute)

    //Updated 23.3.1, this filter is used to remove courses with insufficient data in descending mode.
    const filterInvalidCourse = (course) => {
        if(courseFilterStatus.sortKey === sortStatics.sortKeyItem[0] ||
          courseFilterStatus.sortKey === sortStatics.sortKeyItem[1]){
            if(courseFilterStatus.order === sortStatics.orderItem[courseFilterStatus.sortKey][1]){
                if(sortPolicy[courseFilterStatus.sortKey](course) === 0) return false
            }
        }
        return true
    }

    const sortStatics = {
        sortKeyItem: ['综合评分', '评价总数', "学分"],
        orderItem: {
            "综合评分": ["从高到低", "从低到高"],
            "评价总数": ["从多到少", "从少到多"],
            "学分": ["从多到少", "从少到多"]
        },
    }
    const sortPolicy = {
        "综合评分": (x) => x.comment_num < enoughDataThreshold ? 0 : averageOf(x.score),
        "评价总数": (x) => x.comment_num < enoughDataThreshold ? 0 : x.comment_num,
        "学分": (x) => x.credit
    }
    const sortFunc = (x, y) => {
        // by default, [0] is descending, [1] is ascending
        return (courseFilterStatus.order === sortStatics.orderItem[courseFilterStatus.sortKey][0] ? 1 : -1) *
          sortCmp(
            sortPolicy[courseFilterStatus.sortKey](x), sortPolicy[courseFilterStatus.sortKey](y)
          )
    }

    // A notice for future developers: The if statement justifying if to and from are equal is not necessary
    //  if you dont change the watch target in the watch function, otherwise you must use it to avoid infinite loop
    watch(() => courseFilterStatus.order, useDebounce((to, from) => {
        courseRawText.value.sort(sortFunc)
        status.page = 1
    }))

    watch(() => courseFilterStatus.sortKey, useDebounce((to, from) => {
        if (courseFilterStatus.order === sortStatics.orderItem[courseFilterStatus.sortKey][0]) {
            courseRawText.value.sort(sortFunc) // Force sort, since some keys are duplicated
        } else {
            courseFilterStatus.order = sortStatics.orderItem[courseFilterStatus.sortKey][0]
        }
    }))

    watch(() => courseFilterStatus.selected, useDebounce((to, from) => {
        if (notEqual(to, from)) { // This is necessary because of we need it to judge if it is from the saved status
            status.page = 1
        }
    }))



    onMounted(() => {
        getCourseAll()
    })



    provide("courseStatistic", courseStatistic)
    provide("courseFilterStatus", courseFilterStatus)



    return { courseText, status, courseFilterStatus, sortStatics }
}
