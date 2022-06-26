import { ref, watch, computed } from "@vue/composition-api"
import useFetching from "@/composables/global/useFetching"

export default () => {

  const courses = ref([])

  const fetchStatus = ref("loading")

  const iterator = ref({
    pageNow: 1,
    itemsPerPage: 10,
    disableFiltering: true,
    showPagination: computed(() => {
      return iterator.value.lengthFiltered > 0
    }),
    numberOfPages: computed(() => {
      return getNumberOfPages(iterator.value.lengthFiltered)
    }),
    lengthFiltered: computed(() => {
      return iterator.value.disableFiltering ? courses.value.length : coursesMatchingFilter().length
    })
  })

  const appendCheckedProp = (courses) => courses.map(course => {
    course.checked = false
    return course
  })

  const getCourses = () => {
    const { status, data } = useFetching("course_all", "/course/all")
    fetchStatus.value = status
    watch(() => data, () => {
      courses.value = data.value ? appendCheckedProp(data.value.data) : []
    }, { deep: true, immediate: true })
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

  return { courses, iterator, getCourses, getCourseLinkPath, coursesMatchingFilter, fetchStatus }
}
