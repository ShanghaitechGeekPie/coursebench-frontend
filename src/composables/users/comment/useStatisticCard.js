import { inject, reactive, toRefs } from "vue"
import { 
  mdiCommentCheckOutline, 
  mdiThumbUpOutline, 
  mdiChevronDown, 
  mdiChevronUp, 
  mdiClipboardText, 
} from "@mdi/js"

export default () => {

  const commentStatistic = inject('commentStatistic')

  const statics = {
    icons: {
      mdiCommentCheckOutline,
      mdiChevronDown,
      mdiChevronUp,
      mdiThumbUpOutline, 
      mdiClipboardText, 
    },
  }

  const status = reactive({
    showAll: true,
    ...toRefs(inject("commentFilterStatus"))
  })

  return { commentStatistic, statics, status }
}