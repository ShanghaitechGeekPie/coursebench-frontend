import { reactive } from "@vue/composition-api"
import { mdiChevronDown, mdiChevronUp } from "@mdi/js"

export default () => {

  const statics = {
    icons: {
      mdiChevronDown, 
      mdiChevronUp, 
    }, 
    inf: 100000, 
  }

  const status = reactive({
    isOverflow: false, 
    showAll: false, 
  })

  return { statics, status }
}