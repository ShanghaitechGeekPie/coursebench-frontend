import { provide, reactive, ref, onMounted, computed, inject } from "vue"
import useFetching from "@/composables/global/useFetching"
import useWatching from "@/composables/global/useWatching"
import useRefCopy from "@/composables/global/useRefCopy"
import { useRouter, useRoute } from "@/router/migrateRouter"
import { isNetworkError } from "@/composables/global/useHttpError"
import { instituteInfo } from "@/composables/global/useStaticData"

export default () => {

  const router = useRouter()
  const route = useRoute()
  const showSnackbar = inject("showSnackbar")

  let teacherDetail = reactive({
    "id": 0,
    "name": "",
    "avatar": "",
    "institute": "",
    "job": "",
    "introduction": "",
    "courses": [],
  })

  let courseText = ref([])

  const courseStatistic = reactive({
    total: 0,
    score: 0,
    count: (() => {
      let ret = {}
      for (let key in instituteInfo) {
        ret[instituteInfo[key].name] = 0
      }
      return ret
    })(),
  })

  const status = reactive({
    selected: computed(() => {
      let ret = new Array()
      for (let key in courseStatistic.count) {
        if (courseStatistic.count[key]) ret.push(key)
      }
      return ret
    }),
    loading: true
  })

  const getCourseStatistic = () => {
    courseStatistic.total = teacherDetail.courses.length
    const schools = Object.getOwnPropertyNames(courseStatistic.count).filter((key) => {
      return key != "__ob__" && key != "其他学院"
    })
    for (let course of teacherDetail.courses) {
      if (schools.indexOf(course.institute) >= 0) {
        courseStatistic.count[course.institute]++
      } else {
        courseStatistic.count["其他学院"]++
      }
    }
  }

  const getTeacherDetail = () => {
    const id = route.params.id
    const { status: fetchStatus, data, error } = useFetching(["teacher_detail", id], "/teacher/" + id)
    useWatching(fetchStatus, () => {
      if (fetchStatus.value == "success") status.loading = false
      else if (fetchStatus.value == "error") {
        const response = error.value.response
        showSnackbar("error", isNetworkError(response) ? "网络连接失败" : response.data.msg, 3000)
        setTimeout(() => { router.push("/") }, 3000)
      }
    })
    useWatching(data, () => {
      if (data.value) {
        useRefCopy(data.value.data, teacherDetail)
        getCourseStatistic()
        courseText.value = teacherDetail.courses
      }
    })
  }

  onMounted(() => {
    getTeacherDetail()
  })

  provide("courseStatistic", courseStatistic)

  provide("courseStatus", status)

  provide("teacherDetail", teacherDetail)

  return { courseText, status }

}