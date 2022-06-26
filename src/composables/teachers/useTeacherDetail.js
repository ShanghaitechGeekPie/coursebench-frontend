import { provide, reactive, onMounted, computed } from "@vue/composition-api"
import vue from "@/main.js"
import useFetching from "@/composables/global/useFetching"
import useWatching from "@/composables/global/useWatching"
import useRefCopy from "@/composables/global/useRefCopy"

export default () => {

  let teacherDetail = reactive({
    "id": 0,
    "name": "",
    "avatar": "",
    "institute": "",
    "job": "",
    "introduction": "其他学院", 
    "courses": [],
  })

  let courseText = reactive([])

  const courseStatistic = reactive({
    total: 0,
    score: 0,
    count: {
      "信息科学与技术学院": 0, 
      "物质科学与技术学院": 0,
      "生命科学与技术学院": 0,
      "创意与艺术学院": 0, 
      "创业与管理学院": 0, 
      "人文科学研究院": 0, 
      "生物医学工程学院": 0, 
      "数学科学研究所": 0, 
      "其他学院": 0, 
    }
  })

  const status = reactive({
    selected: computed(() => {
      let ret = new Array()
      for (let key in courseStatistic.count) {
        if (courseStatistic.count[key]) {
          ret.push(key)
        }
      } 
      return ret
    }), 
    loading: true
  })

  const getCourseStatistic = () => {
    courseStatistic.total = teacherDetail.courses.length
    if (teacherDetail.institute == "") {
      teacherDetail.institute = "其他学院"
    }
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
    const id = vue.$route.params.id
    const { status: fetchStatus, data } = useFetching("teacher_" + id, "/teacher/" + id)
    useWatching(fetchStatus, () => {
      if (fetchStatus != "loading") {
        status.loading = false
        if (fetchStatus.value == "error") {
          vue.$router.push("/404NotFound")
        }
      }
    })
    useWatching(data, () => {
      if (data.value) {
        useRefCopy(data.value.data, teacherDetail)
        getCourseStatistic()
        useRefCopy(teacherDetail.courses, courseText)        
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