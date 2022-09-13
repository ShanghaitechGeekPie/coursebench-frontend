import {onMounted, provide, ref, reactive} from "vue"
import {defaultStatus, sortStatics, sortPolicy} from "@/composables/global/useCommentSort"
import useFetching from "@/composables/global/useFetching";
import useDebounce from "@/composables/global/useDebounce"
import useWatching from "@/composables/global/useWatching";
import useRefCopy from "@/composables/global/useRefCopy";
import {sortCmp} from "@/composables/global/useArrayUtils"
import useRecordWatch from "@/composables/global/useRecordWatch"
import {useRoute, useRouter} from "@/router/migrateRouter";

export default () => {

    const testTeachers = [
        {"name": "孙伟", "id": 293},
        {"name": "姚成建", "id": 23},
        {"name": "Ranjan Ritwik", "id": 923},
    ]
    const getTeachers = () => {
        const teachers = testTeachers

        return teachers
    }
    const teachers = ref([])
    const router = useRouter()
    const route = useRoute()

    provide('teachers', teachers);

    const status = reactive({
        ...defaultStatus,
        loading: false,
        // currentCouseId: 0
    })

    let courseDetail = reactive({
            name: "计算机编程",
            code: "CS100",
            id: 123,
            institute: "SIST",
            credit: 4,
            score: [4.1, 4.2, 4.3, 4.2], //若 comments_num 为0,则该项无意义
            comments_num: 10, // 可见的评论数
            "groups": [
                {
                    "id": 1,
                    "code": "CS100.01",
                    "comments_num": 10,
                    "score": [4.1, 4.2, 4.3, 4.2], //同上
                    "teachers": [{"name": "高盛华", "id": 23}]
                }]
        }
    )
    let courseId = reactive({})
    const commentText = ref([])

    const commentSortFunc = (x, y) => {
        // by default, [0] is descending, [1] is ascending
        return (status.order === sortStatics.orderItem[status.sortKey][0] ? 1 : -1) *
            sortCmp(
                sortPolicy[status.sortKey](x), sortPolicy[status.sortKey](y)
            )
    }

    // Fixed: use an inefficient way to make work temporarily
    useRecordWatch(status, useDebounce((lastStatus) => {
        if (lastStatus.order !== status.order) {
            commentText.value.sort(commentSortFunc) // I dont know how js sort works in the vm
            // but dont feel strange if it dont work for the values that are the same
        } else if (lastStatus.sortKey !== status.sortKey) {
            status.order = sortStatics.orderItem[status.sortKey][0]
            commentText.value.sort(commentSortFunc) // I sort it here because some sort keys have the same order item
            // in that case the first if statement will not be triggered
        }
    }))

    const getCourseComment = () => {
        const id = route.params.id
        const {status: fetchStatus, data, error} = useFetching(["course_comment", id], "/comment/course/" + id)
        useWatching(fetchStatus, () => {
            // console.log("Data Fetched!")
            if (fetchStatus.value === "success") {
            } else if (fetchStatus.value === "error") {
                const response = error.value.response
                // showSnackbar("error", isNetworkError(response) ? "网络连接失败" : response.data.msg, 3000)
                setTimeout(() => router.push("/"), 3000)
            }
        })
        useWatching(data, () => {
            // console.log("Data Assigned!")
            if (data.value) {
                useRefCopy(data.value.data, commentText.value)
                commentText.value.sort(commentSortFunc)
            }
        })
    }

    provide("courseCommentStatus", status)
    provide("courseId", courseId)

    const getCourseDetail = () => {
        const id = route.params.id
        const {status: fetchStatus, data, error} = useFetching(["course_detail", id], "/course/" + id)
        useWatching(fetchStatus, () => {
            // console.log("Data Fetched!")
            if (fetchStatus.value === "success") {
            } else if (fetchStatus.value === "error") {
                const response = error.value.response
                // showSnackbar("error", isNetworkError(response) ? "网络连接失败" : response.data.msg, 3000)
                setTimeout(() => router.push("/"), 3000)
            }
        })
        useWatching(data, () => {
            // console.log("Data Assigned!")
            if (data.value) {
                useRefCopy(data.value.data, courseDetail)
                courseId.value = {
                    id: courseDetail.groups[0].id
                }
            }
        })
    }

    onMounted(() => {
        teachers.value = getTeachers()
        getCourseDetail()
        getCourseComment()
    })


    return {teachers, commentText, status, courseDetail}
}
