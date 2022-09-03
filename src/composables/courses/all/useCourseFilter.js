import { reactive, ref } from "vue"
import { instituteInfo } from "@/composables/global/useStaticData";
import { mdiCity } from "@mdi/js";


export default () => {

    const statics = {
        icons: {
            mdiCity
        }
    }
    
    const testCourseData = ref([
        {
            "name": "计算机编程",
            "code": "CS100",
            "id": 123,
            "credit": 4,
            "score": [4,1,4.2,4.3,4.4], //若 comments_num 为0,则该项无意义
            "comments_num": 10, // 可见的评论数
            "institute": "SIST"
        }
    ])

    const courseStatistic = reactive((() => {
        let res = {
            total: testCourseData.length,
            count: (() => {
                let ret = {}
                for (let key in instituteInfo) {
                    if (key !== "None") {
                        ret[instituteInfo[key].name] = 0
                    }
                }                
                return ret
            })()
        }
        for (let course of testCourseData.value) {
            if (instituteInfo[course.institute]) {
                res.count[instituteInfo[course.institute].name]++
            } else {
                res.count["其他学院"]++
            }
        }
        return res
    })())

    const status = reactive({
        selected: Object.getOwnPropertyNames(courseStatistic.count)
                        .filter((key) => key !== "__ob__" ),
    })

    return { statics, courseStatistic, status }

}