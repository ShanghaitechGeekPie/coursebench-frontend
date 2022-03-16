import { inject, reactive, toRefs } from "@vue/composition-api"
import { 
  mdiClipboardOutline, 
  mdiThumbUpOutline, 
  mdiChevronDown, 
  mdiChevronUp, 
  mdiClipboardText, 
} from "@mdi/js"

export default () => {

  const courseStatistic = inject('courseStatistic')

  const statics = {
    icons: {
      mdiClipboardOutline,
      mdiChevronDown,
      mdiChevronUp,
      mdiThumbUpOutline, 
      mdiClipboardText, 
    },
  }

  const status = reactive({
    showAll: true,
    ...toRefs(inject("courseStatus"))
  })

  return { courseStatistic, statics, status }
}