import {
  mdiAccountOutline, 
  mdiClockOutline, 
  mdiSchoolOutline,  
  mdiSubtitlesOutline, 
  mdiTriangle,
  mdiTriangleSmallDown,
  mdiTriangleSmallUp,
  mdiShare,
  mdiGold
} from "@mdi/js";
import { gradingInfo } from "@/composables/global/useStaticData";
import { inject } from "vue";
export default () => {
  const global = inject("global")
  const statics = {
    icons: {
      mdiAccountOutline,
      mdiClockOutline,
      mdiSchoolOutline,  
      mdiSubtitlesOutline, 
      mdiTriangle,
      mdiTriangleSmallDown,
      mdiTriangleSmallUp,
      mdiShare,
      mdiGold
    },
    grade: [
      gradingInfo.quality, 
      gradingInfo.workload,
      gradingInfo.difficulty,
      gradingInfo.distribution
    ], 
  }

  return { statics, global }
}