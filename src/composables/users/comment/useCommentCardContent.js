import {
  mdiAccountOutline, 
  mdiClockOutline, 
  mdiSchoolOutline,  
  mdiSubtitlesOutline, 
} from "@mdi/js";
import { gradingInfo } from "@/composables/global/useStaticData";

export default () => {

  const statics = {
    icons: {
      mdiAccountOutline,
      mdiClockOutline,
      mdiSchoolOutline,  
      mdiSubtitlesOutline, 
    },
    grade: [
      gradingInfo.quality, 
      gradingInfo.workload,
      gradingInfo.difficulty,
      gradingInfo.distribution
    ], 
    color: gradingInfo.color
  }

  return { statics }
}