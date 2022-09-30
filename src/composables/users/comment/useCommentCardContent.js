import {
  mdiAccountOutline, 
  mdiClockOutline, 
  mdiSchoolOutline,  
  mdiSubtitlesOutline, 
  mdiTriangleOutline,
    mdiTriangleSmallDown,
    mdiTriangleSmallUp
} from "@mdi/js";
import { gradingInfo } from "@/composables/global/useStaticData";

export default () => {

  const statics = {
    icons: {
      mdiAccountOutline,
      mdiClockOutline,
      mdiSchoolOutline,  
      mdiSubtitlesOutline, 
      mdiTriangleOutline,
      mdiTriangleSmallDown,
      mdiTriangleSmallUp
    },
    grade: [
      gradingInfo.quality, 
      gradingInfo.workload,
      gradingInfo.difficulty,
      gradingInfo.distribution
    ], 
  }

  return { statics }
}