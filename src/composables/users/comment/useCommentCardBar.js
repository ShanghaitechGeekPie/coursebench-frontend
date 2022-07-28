import { mdiUpdate, mdiCommentEditOutline } from "@mdi/js";
import { instituteInfo, gradeItems } from "@/composables/global/useStaticData"

export default () => {

  const statics = {
    background: (() => {
      let ret = {}
      for (let key in instituteInfo) {
        ret[instituteInfo[key].name] = instituteInfo[key].color
      }
      return ret
    })(),
    short: (() => {
      let ret = {}
      for (let key in instituteInfo) {
        ret[instituteInfo[key].name] = key
      }
      return ret
    })(),
    icons: {
      mdiUpdate,
      mdiCommentEditOutline,
    }
  }

  return { statics, gradeItems}
}
