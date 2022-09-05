import {
  mdiSchool,  
  mdiDotsHorizontal, 
} from "@mdi/js";
import { instituteInfo, scoreInfo } from "@/composables/global/useStaticData";

export default () => {

  const statics = {
    background: (() => {
      let res = {}
      for (let key in instituteInfo) {
        res[instituteInfo[key].name] = instituteInfo[key].color
      }
      return res
    })(), 
    short: (() => {
      let res = {}
      for (let key in instituteInfo) {
        res[instituteInfo[key].name] = key
      }
      return res
    })(), 
    color: scoreInfo.map(obj => obj.color), 
    label: scoreInfo.map(obj => obj.label), 
    icons: {
      mdiSchool,  
      mdiDotsHorizontal, 
    }, 
    enoughDataThreshold: 3,
  }

  return { statics }
}