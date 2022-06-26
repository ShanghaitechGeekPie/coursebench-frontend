import { ref, reactive, watch, computed } from "@vue/composition-api"
import useFetching from "@/composables/global/useFetching"
import useSearch from "@/composables/global/useSearch"
import useRefBinding from "@/composables/global/useRefBinding"

export default () => {

  const courses = ref([])

  const fetchStatus = ref("loading")

  const pageProps = reactive({
    pageNow: 1,
    itemsPerPage: 10,
    disableFiltering: true,
    showPagination: computed(() => {
      return pageProps.lengthFiltered > 0
    }),
    numberOfPages: computed(() => {
      return getNumberOfPages(pageProps.lengthFiltered)
    }),
    lengthFiltered: computed(() => {
      return pageProps.disableFiltering ? coursesSearched.value.length : coursesMatchingFilter().length
    })
  })

  const searchUtils = useSearch()

  const coursesSearched = computed(() => {
    return searchUtils.handleSearch(courses.value)
  })

  const appendCheckedProp = (courses) => courses.map(course => {
    course.checked = false
    return course
  })

  const fetchCourses = () => {
    const { status, data } = useFetching("course_all", "/course/all")
    useRefBinding(status, () => { fetchStatus.value = status.value })
    useRefBinding(data, () => { courses.value = data.value ? appendCheckedProp(data.value.data) : [] })
  }

  const getCourseLinkPath = (id) => {
    return "/course/" + id
  }

  const getNumberOfPages = (length) => {
    return Math.ceil(length / pageProps.itemsPerPage)
  }

  const coursesMatchingFilter = () => {
    return coursesSearched.value.filter(course => course.checked)
  }

  return { coursesSearched, fetchStatus, pageProps, searchUtils, fetchCourses, getCourseLinkPath, coursesMatchingFilter }
}
