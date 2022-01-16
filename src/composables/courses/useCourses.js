import { ref, computed } from "@vue/composition-api"

export default () => {

  const courses = ref([])

  const pageNow = ref(1)

  const itemsPerPage = ref(5)

  const disableFiltering = ref(true)

  const getCourses = () => {
    for (let index = 0; index < 10; index++) {
      courses.value.push({
        "name": "计算机编程",
        "code": "CS100",
        "id": index,
        "score": 4.2,
        "insitute": "SIST",
        "checked": false
      })
    }
  }

  const getCourseLinkPath = (id) => {
    return "/course/" + id
  }

  const coursesMatchingFilter = () => {
    return courses.value.filter(
      course => course.cheched
    )
  }

  const numberOfPages = computed(() => {
    Math.ceil(courses.value.length / itemsPerPage.value)
  })

  return { courses, pageNow, itemsPerPage, disableFiltering, getCourses, getCourseLinkPath, coursesMatchingFilter, numberOfPages }
}
