import { ref, computed } from "@vue/composition-api"

export default () => {

  const courses = ref([])

  const iterator = ref({
    pageNow: 1,
    itemsPerPage: 5,
    disableFiltering: true,
    lengthFiltered: computed(() => {
      return iterator.value.disableFiltering ? courses.value.length : coursesMatchingFilter().length
    }),
    numberOfPages: computed(() => {
      return getNumberOfPages(iterator.value.lengthFiltered)
    }),
    showPagination: computed(() => {
      return iterator.value.lengthFiltered > 0
    })
  })

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

  const getNumberOfPages = (length) => {
    return Math.ceil(length / iterator.value.itemsPerPage)
  }

  const coursesMatchingFilter = () => {
    return courses.value.filter(course => course.checked)
  }

  return { courses, iterator, getCourses, getCourseLinkPath, coursesMatchingFilter }
}
