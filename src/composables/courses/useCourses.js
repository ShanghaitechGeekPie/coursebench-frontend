import { ref, toRefs, toRef, effectScope, watch, watchEffect, reactive, computed } from "@vue/composition-api"
import useFetching from "@/composables/global/useFetching"

export default () => {

  const courses = ref([])

  const iterator = ref({
    pageNow: 1,
    itemsPerPage: 10,
    disableFiltering: true,
    lengthFiltered: computed(() => {
      return iterator.value.disableFiltering ? getLength(courses.value) : getLength(coursesMatchingFilter())
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

  const getLength = (value) => {
    return value ? value.length : 0
  }

  const getCourses = () => {
    const response = useFetching("course_all", "/course/all", (result) => result.data)
    fetchStatus.value = response.status
    courses.value = reactive(response.data)
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
