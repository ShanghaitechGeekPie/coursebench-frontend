import { inject } from "@vue/composition-api"

export default () => {

  const teacherDetail = inject("teacherDetail")

  return { teacherDetail }
}