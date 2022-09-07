import { inject, reactive, toRefs } from "vue"
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
    ...toRefs(inject("courseFilterStatus"))
  })

  return { courseStatistic, statics, status }
}