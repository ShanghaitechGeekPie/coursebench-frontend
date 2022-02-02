import { reactive } from "@vue/composition-api"
import { mdiChevronDown, mdiChevronUp } from "@mdi/js"

export default () => {

  const statics = reactive({
    icons: {
      mdiChevronDown, 
      mdiChevronUp, 
    }
  })

  const status = reactive({
    isOverflow: false, 
    showAll: false, 
  })

  return { statics, status }
}