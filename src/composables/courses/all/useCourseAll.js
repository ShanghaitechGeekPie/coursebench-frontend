import { provide, reactive, ref, onMounted, inject, watch } from "vue"
import { instituteInfo } from "@/composables/global/useStaticData";
import useDebounce from "@/composables/global/useDebounce"
import { sortCmp, averageOf } from "@/composables/global/useArrayUtils"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";

export default () => {

    const showSnackbar = inject("showSnackbar")


    const statics = {
        icons: {
            mdiChevronLeft, 
            mdiChevronRight
        }, 
    }


    const courseText = ref([])

    const courseStatistic = reactive({
        total: 0,
        count: (() => {
            let ret = {}
            for (let key in instituteInfo) {
                if (key !== "None") {
                    ret[instituteInfo[key].name] = 0
                }
            }                
            return ret
        })(),
    })



    const status = reactive({
        selected: Object.getOwnPropertyNames(courseStatistic.count)
                        .filter((key) => key !== "__ob__" ),
        sortKey: "综合评分",
        order: "从高到低",
        loading: true, 
        page: 1,
    })

    const getCourseStatistic = () => {
        courseStatistic.total = courseText.value.length
        for (let course of courseText.value) {
            if (instituteInfo[course.institute]) {
                courseStatistic.count[instituteInfo[course.institute].name]++
            } else {
                courseStatistic.count["其他学院"]++
            }
        }
    }

    const getCourseAll = () => {
        let testDataSlice = [
            {
                "name": "计算机编程",
                "code": "CS100",
                "id": 123,
                "credit": 4,
                "score": [4,1,4.2,4.3,4.4], //若 comments_num 为0,则该项无意义
                "comments_num": 10, // 可见的评论数
                "institute": "SIST"
            }, 
            {
                "name": "大学物理I",
                "code": "SP1101",
                "id": 1234,
                "credit": 4,
                "score": [5,2,4.3,3.4,4.4], //若 comments_num 为0,则该项无意义
                "comments_num": 8, // 可见的评论数
                "institute": "SPST"
            }, 
            {
                "name": "全球健康挑战",
                "code": "SL1007",
                "id": 1235,
                "credit": 2,
                "score": [5,5,5,5,5], //若 comments_num 为0,则该项无意义
                "comments_num": 10, // 可见的评论数
                "institute": "SLST"
            }, 
            {
                "name": "经济学导论",
                "code": "SE1001",
                "id": 1231,
                "credit": 3,
                "score": [4,4,2,2,4.4], //若 comments_num 为0,则该项无意义
                "comments_num": 12, // 可见的评论数
                "institute": "SEM"
            }, 
            {
                "name": "中华文明通论",
                "code": "GEMA1001",
                "id": 1230,
                "credit": 3,
                "score": [1,4,1,1,1], //若 comments_num 为0,则该项无意义
                "comments_num": 18, // 可见的评论数
                "institute": "GE"
            }
        ]
        let testData = testDataSlice
        for (let i = 0; i < 5; i++) {
            testData.push(...testDataSlice)
        }
        for (let i = 0; i < 5 * 5; i++) {
            testData[i].id = i
        }
        

        courseText.value = testData
        getCourseStatistic()
    }


    const sortStatics = {
        sortKeyItem: ['综合评分', '评价总数', "学分"],
        orderItem: {
            "综合评分": ["从高到低", "从低到高"],
            "评价总数": ["从多到少", "从少到多"], 
            "学分": ["从多到少", "从少到多"]
        },
    }
    let lastStatus = Object.assign({}, status)
    const sortPolicy = {
      "综合评分": (x) => averageOf(x.score),
      "评价总数": (x) => x.comments_num, 
      "学分": (x) => x.credit
    }
    const sortFunc = (x, y) => sortCmp(
      sortPolicy[status.sortKey](x), sortPolicy[status.sortKey](y)
    )
  
    watch(status, useDebounce((to, from) => {
      if (lastStatus.order != status.order) {
        courseText.value.reverse()
        lastStatus = Object.assign({}, status)
      } else if (lastStatus.sortKey != status.sortKey) {
        status.order = sortStatics.orderItem[status.sortKey][0]
        courseText.value.sort(sortFunc)
        lastStatus = Object.assign({}, status)
      }
    }))    



    onMounted(() => {
        getCourseAll()
        courseText.value.sort(sortFunc)
    })


    provide("sortStatics", sortStatics)
    provide("courseStatistic", courseStatistic)
    provide("courseStatus", status)



    return { statics, courseText, status }
}