import { reactive } from "@vue/composition-api"
import { mdiChevronDown, mdiChevronUp, mdiFullscreen, mdiClose } from "@mdi/js"

export default () => {

  const statics = {
    icons: {
      mdiChevronDown,
      mdiChevronUp,
      mdiFullscreen,
      mdiClose,
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