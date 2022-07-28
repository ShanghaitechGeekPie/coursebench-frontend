import { inject } from "vue"

export default () => {

  const teacherDetail = inject("teacherDetail")

  return { teacherDetail }
}