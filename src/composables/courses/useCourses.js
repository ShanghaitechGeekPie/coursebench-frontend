import { ref, computed } from "@vue/composition-api"
import useFetching from "@/composables/global/useFetching"

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

  const fetchStatus = ref()

  const checkData = ref([])

  const initCheckData = () => {
    
  }

  const getCourses = () => {
    useFetching("course_all", "/course/all", (result) => {
      fetchStatus.value = result.status
      courses.value = result.data.data
    })
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
