import {
    mdiSchool,  
    mdiDotsHorizontal, 
  } from "@mdi/js";
  import { scoreInfo, instituteInfo } from "@/composables/global/useStaticData";

export default () => {

    const statics = {
        scoreColor: scoreInfo.map(obj => obj.color),
        label: scoreInfo.map(obj => obj.label),
        icons: {
            mdiSchool,
            mdiDotsHorizontal,
        }, 
        backgroundColor: (() => {
            let res = {}
            for (let key in instituteInfo) {
                res[instituteInfo[key].name] = instituteInfo[key].color
            }
            return res
        })()
    }



    return { statics }
}