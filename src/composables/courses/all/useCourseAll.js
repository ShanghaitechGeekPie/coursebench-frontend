import { provide, reactive, ref, onMounted, inject } from "vue"
import { instituteInfo } from "@/composables/global/useStaticData";

export default () => {

    const showSnackbar = inject("showSnackbar")

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
        sortKey: "默认",
        order: "默认",
        loading: true
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
        courseText.value = [
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
            "name": "计算机编程",
            "code": "CS100",
            "id": 123,
            "credit": 4,
            "score": [4,1,4.2,4.3,4.4], //若 comments_num 为0,则该项无意义
            "comments_num": 10, // 可见的评论数
            "institute": "SIST"
        }, 
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
            "name": "计算机编程",
            "code": "CS100",
            "id": 123,
            "credit": 4,
            "score": [4,1,4.2,4.3,4.4], //若 comments_num 为0,则该项无意义
            "comments_num": 10, // 可见的评论数
            "institute": "SIST"
        }, 
        {
            "name": "计算机编程",
            "code": "CS100",
            "id": 123,
            "credit": 4,
            "score": [4,1,4.2,4.3,4.4], //若 comments_num 为0,则该项无意义
            "comments_num": 10, // 可见的评论数
            "institute": "SIST"
        }
        ]
        getCourseStatistic()
    }

    onMounted(() => {
        getCourseAll()
    })

    provide("courseStatistic", courseStatistic)
    provide("courseText", courseText)
    provide("courseStatus", status)


    return { courseText, status }
}