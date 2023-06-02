import {
  mdiAccountOutline, 
  mdiClockOutline, 
  mdiSchoolOutline,  
  mdiSubtitlesOutline, 
  mdiTriangle,
  mdiTriangleSmallDown,
  mdiTriangleSmallUp,
  mdiShare
} from "@mdi/js";
import { gradingInfo } from "@/composables/global/useStaticData";

export default () => {

  const statics = {
    icons: {
      mdiAccountOutline,
      mdiClockOutline,
      mdiSchoolOutline,  
      mdiSubtitlesOutline, 
      mdiTriangle,
      mdiTriangleSmallDown,
      mdiTriangleSmallUp,
      mdiShare
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