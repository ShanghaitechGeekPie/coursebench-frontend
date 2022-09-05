import {
    mdiSchool,  
    mdiDotsHorizontal, 
  } from "@mdi/js";
  import { scoreInfo } from "@/composables/global/useStaticData";

export default () => {

    const statics = {
        color: scoreInfo.map(obj => obj.color),
        label: scoreInfo.map(obj => obj.label),
        icons: {
            mdiSchool,
            mdiDotsHorizontal,
        }
    }


    return { statics }
}