import { provide, reactive, ref, onMounted, inject } from "vue"
import { instituteInfo } from "@/composables/global/useStaticData";
import useDebounce from "@/composables/global/useDebounce"
import useWatching from "@/composables/global/useWatching"
import useRecordWatch from "@/composables/global/useRecordWatch"
import useFetching from "@/composables/global/useFetching"
import { sortCmp, averageOf } from "@/composables/global/useArrayUtils"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"
import { enoughDataThreshold } from "@/composables/global/useParseScore"


export default () => {

    const showSnackbar = inject("showSnackbar")
    const searchInput = inject("searchInput")



    const courseRawText = ref([])

    const courseText = ref([])

    const courseStatistic = reactive({
        total: 0,
        count: (() => {
            let ret = {}
            Object.keys(instituteInfo).filter(key => key !== '').forEach(key => {
                ret[key] = 0
            })
            return ret
        })(),
    })



    const status = reactive({
        loading: true,
        page: 1,
    })

    const courseFilterStatus = reactive({
        selected: [],
        sortKey: "综合评分",
        order: "从高到低",
    })



    const getCourseStatistic = () => {
        courseStatistic.total = courseText.value.length
        const schools = Object.getOwnPropertyNames(courseStatistic.count).filter((key) => {
            return key != "__ob__" && key != "其他学院"
        })
        for (let key in courseStatistic.count) {
            courseStatistic.count[key] = 0
        }
        for (let course of courseText.value) {
            if (schools.indexOf(course.institute) >= 0) {
                courseStatistic.count[course.institute]++
            } else {
                course.institute = "其他学院"
                courseStatistic.count["其他学院"]++
            }
        }
    }

    const getCourseAll = () => {
        const { status: fetchStatus, data, error } = useFetching(["course_all"], "/course/all")
        useWatching(fetchStatus, () => {
            if (fetchStatus.value === "success") {
                status.loading = false
            } else if (fetchStatus.value == "error") {
                if (isNetworkError(error.value.response)) {
                    showSnackbar("网络连接错误")
                } else if (isValidErrorMessage(error.value.response.data.msg)) {
                    showSnackbar("error", error.value.response.data.msg)
                } else {
                    showSnackbar("error", "服务器发生错误")
                }
            }
        })
        useWatching(data, () => {
            if (data.value) {
                courseRawText.value = data.value.data
                // Here we need to deep copy the data or the sort will mess up the original data
                courseText.value = [...courseRawText.value]
                getCourseStatistic() 
                courseFilterStatus.selected = (() => {
                    let ret = new Array()
                    for (let key in courseStatistic.count) {
                        if (courseStatistic.count[key]) {
                            ret.push(key)
                        }
                    } return ret
                })()
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
        "评价总数": (x) => x.comment_num,
        "学分": (x) => x.credit
    }
    const sortFunc = (x, y) => {
        // by default, [0] is descending, [1] is ascending
        return (courseFilterStatus.order === sortStatics.orderItem[courseFilterStatus.sortKey][0] ? 1 : -1) *
            sortCmp(
                sortPolicy[courseFilterStatus.sortKey](x), sortPolicy[courseFilterStatus.sortKey](y)
            )
    }

    // Fixed: use an inefficient way to make work temporarily
    useRecordWatch(courseFilterStatus, useDebounce((lastStatus, from, to) => {
        // the if order matters here, it seems that wrapped array is not equal to the unwrapped ones
        if (lastStatus.order != courseFilterStatus.order) {            
            courseText.value.sort(sortFunc) // I dont know how js sort works in the vm
            // but dont feel strange if it dont work for the values that are the same
        } else if (lastStatus.sortKey != courseFilterStatus.sortKey) {
            courseFilterStatus.order = sortStatics.orderItem[courseFilterStatus.sortKey][0]
            courseText.value.sort(sortFunc) // I sort it here because some sort keys have the same order item
            // in that case the first if statement will not be triggered
        } else if (lastStatus.selected != courseFilterStatus.selected) {
            courseText.value = courseRawText.value.filter(
                (course) => courseFilterStatus.selected.some((item) => item === course.institute)
            )
            courseText.value.sort(sortFunc) 
            status.page = 1
        }
    }))

    useWatching(searchInput, useDebounce((to, from) => {
        courseText.value = courseRawText.value.filter((course) => {
            if (searchInput.keys === 0) {
                return true;
            } else if (searchInput.isRegexp) {
                return matchSearchKeys((key) => {
                    return new RegExp(key).test(course.name);
                })
            } else {
                return matchSearchKeys((key) => {
                    return course.name.includes(key);
                })
            }
        })
        getCourseStatistic()
        courseText.value.sort(sortFunc)
        if (courseFilterStatus.order != sortStatics.orderItem[courseFilterStatus.sortKey][0]) {
            courseText.value.reverse()
        }
    }))



    onMounted(() => {
        getCourseAll()
    })



    provide("sortStatics", sortStatics)
    provide("courseStatistic", courseStatistic)
    provide("courseFilterStatus", courseFilterStatus)



    return { courseText, status, courseFilterStatus }
}