import { inject, reactive } from "vue"
import useWatching from "@/composables/global/useWatching"
import { instituteInfo } from "@/composables/global/useStaticData"

export default () => {

  const teacherDetail = inject("teacherDetail")

  const statics = reactive({
    backgroundLight: instituteInfo[teacherDetail.institute].color, 
    backgroundDark: 'grey darken-3', 
  })

  useWatching(teacherDetail, () => {
    statics.backgroundLight = instituteInfo[teacherDetail.institute].color
  })

  return { statics }
}