import {onMounted, provide, ref, reactive, inject} from "vue"
import {defaultStatus, sortStatics, sortPolicy} from "@/composables/global/useCommentSort"
import useFetching from "@/composables/global/useFetching";
import useDebounce from "@/composables/global/useDebounce"
import useWatching from "@/composables/global/useWatching";
import useRefCopy from "@/composables/global/useRefCopy";
import {sortCmp} from "@/composables/global/useArrayUtils"
import useRecordWatch from "@/composables/global/useRecordWatch"
import {useRoute, useRouter} from "@/router/migrateRouter";
import {isNetworkError} from "@/composables/global/useHttpError";

export default () => {

    const teachers = ref([])
    const groups = ref([])
    const selectedTeachers = ref([])
    const router = useRouter()
    const route = useRoute()
    const showSnackbar = inject("showSnackbar")

    provide('teachers', teachers);
    provide('groups', groups);
    provide('selectedTeachers', selectedTeachers);

    const status = reactive({
        ...defaultStatus,
        loading: false,
        // currentCouseId: 0
    })

    let courseDetail = reactive({
            name: "",
            code: "",
            id: 1,
            institute: "",
            credit: 1,
            score: [0, 0, 0, 0], //若 comments_num 为0,则该项无意义
            comment_num: 0, // 可见的评论数
            groups: []
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
    const arrayUnique = (value, index, self) => {
        const getId = (x)=>{return x.id}
        return self.map(getId).indexOf(getId(value)) === index;
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
                showSnackbar("error", isNetworkError(response) ? "网络连接失败" : response.data.msg, 3000)
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
                showSnackbar("error", isNetworkError(response) ? "网络连接失败" : response.data.msg, 3000)
                setTimeout(() => router.push("/"), 3000)
            }
        })
        useWatching(data, () => {
            // console.log("Data Assigned!")
            if (data.value) {
                useRefCopy(data.value.data, courseDetail)
                courseId.value = {
                    id: id
                }
                if (courseDetail.groups) {
                    let teacherContainer = []
                    courseDetail.groups.forEach((value, index, array)=>{
                        let names = ""
                        value.teachers.forEach((teacher, teacherIndex, teacherArray) => {
                            names += teacher.name
                            if (teacherIndex !== teacherArray.length - 1) {
                                names += ", "
                            }
                            teacherContainer.push(teacher)
                        })
                        groups.value.push({
                            id: value.id,
                            name: names
                        })
                        selectedTeachers.value.push(index)
                    })
                    // teachers.value = [...new Set(teacherContainer)]
                    teachers.value = teacherContainer.filter(arrayUnique)
                }
            }
        })
    }

    onMounted(() => {
        getCourseDetail()
        getCourseComment()
    })


    return {teachers, commentText, status, courseDetail, selectedTeachers, groups}
}
