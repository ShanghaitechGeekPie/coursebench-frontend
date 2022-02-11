import { reactive } from "@vue/composition-api"
import {
  mdiAccountOutline, 
  mdiClockOutline, 
  mdiSchoolOutline,  
  mdiSubtitlesOutline, 
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
      [ "很差", "较差", "一般", "较好", "很好" ], 
      [ ">8h ", "4-8h", "2-4h", "1-2h", "<1h " ], 
      [ "很难", "较难", "适中", "偏易", "简单" ], 
      [ "很差", "较差", "一般", "较好", "很好" ], 
    ], 
    color: [
      "#FF0000", 
      "#D95F00", 
      "#A88200", 
      "#709800",
      "#00A607", 
    ]
  }

  const status = reactive({

  })

  return { statics, status }
}