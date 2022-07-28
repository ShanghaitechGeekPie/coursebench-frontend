import { inject, reactive } from "vue"
import useWatching from "@/composables/global/useWatching"
import { instituteInfo } from "@/composables/global/useStaticData"

export default () => {

  const background = (() => {
    let ret = {}
    for (let key in instituteInfo) {
      ret[instituteInfo[key].name] = instituteInfo[key].color
    }
    return ret
  })()

  const teacherDetail = inject("teacherDetail")

  const statics = reactive({
    backgroundLight: background[teacherDetail.institute], 
    backgroundDark: 'grey darken-3', 
  })

  useWatching(teacherDetail, () => {
    statics.backgroundLight = background[teacherDetail.institute]
  })

  return { statics }
}