import { reactive } from "@vue/composition-api"
import {
  mdiAccountOutline, 
  mdiClockOutline, 
  mdiSchoolOutline,  
  mdiSubtitlesOutline, 
  mdiNumeric1BoxOutline,
  mdiNumeric2BoxOutline,
  mdiNumeric3BoxOutline, 
  mdiNumeric4BoxOutline,
  mdiNumeric5BoxOutline,
} from "@mdi/js";

export default () => {

  const statics = {
    icons: {
      mdiAccountOutline,
      mdiClockOutline,
      mdiSchoolOutline,  
      mdiSubtitlesOutline, 
    },
    grade: [
      mdiNumeric1BoxOutline,
      mdiNumeric2BoxOutline,
      mdiNumeric3BoxOutline, 
      mdiNumeric4BoxOutline,
      mdiNumeric5BoxOutline,
    ]
  }

  const status = reactive({

  })

  return { statics, status }
}