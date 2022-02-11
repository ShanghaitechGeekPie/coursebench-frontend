import { reactive } from "@vue/composition-api"
import { mdiChevronDown, mdiChevronUp, mdiFullscreen, mdiFullscreenExit } from "@mdi/js"

export default () => {

  const statics = {
    icons: {
      mdiChevronDown,
      mdiChevronUp,
      mdiFullscreen,
      mdiFullscreenExit,
    },
    inf: 100000,
  }

  const status = reactive({
    isOverflow: false,
    showAll: false,
    showDialog: false,
  })

  return { statics, status }
}