import { ref, reactive, computed } from "vue"
import useFetching from "@/composables/global/useFetching"
import useSearch from "@/composables/global/useSearch"
import useWatching from "@/composables/global/useWatching"
import useDebounce from "@/composables/global/useDebounce"

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

  const coursesSearched = ref([])

  useWatching(searchUtils.searchText, useDebounce(() => {
    coursesSearched.value = searchUtils.handleSearch(courses.value)
  }, 200))

  const appendCheckedProp = (courses) => courses.map(course => {
    course.checked = false
    return course
  })

  const fetchCourses = () => {
    const { status, data } = useFetching("course_all", "/course/all")
    useWatching(status, () => { fetchStatus.value = status.value })
    useWatching(data, () => { courses.value = data.value ? appendCheckedProp(data.value.data) : [] })
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
