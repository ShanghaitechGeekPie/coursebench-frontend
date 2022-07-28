import { reactive } from "vue"
import { 
  mdiChevronDown, 
  mdiChevronUp, 
  mdiFullscreen, 
  mdiClose, 
  mdiSubtitlesOutline 
} from "@mdi/js"

export default () => {

  const statics = {
    icons: {
      mdiChevronDown,
      mdiChevronUp,
      mdiFullscreen,
      mdiClose,
      mdiSubtitlesOutline,
    },
    inf: 100000,
  }

  const status = reactive({
    isOverflow: false,
    showAll: false,
    showDialog: false,
    // showDialogOverlay: false
  })

  return { statics, status }
}