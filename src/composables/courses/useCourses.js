import { ref, computed } from "@vue/composition-api"
import { useQuery } from "vue-query"
import axios from "axios"

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

  const getCourses = () => {
    const {status, data} = useQuery("course_all", async () => 
      await axios.get("https://cb.wa-am.com:2/api/v1/course/all")
    )
    fetchStatus = status
    courses = data.data
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
