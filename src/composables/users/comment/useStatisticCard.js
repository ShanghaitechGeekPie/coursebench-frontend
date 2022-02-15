import { inject, reactive, toRefs } from "@vue/composition-api"
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
    sortKeyItem: ['修改时间', '发布时间'],
    orderItem: ['从前往后', '从后往前']
  }

  const status = reactive({
    showAll: true,
    ...toRefs(inject("commentStatus"))
  })

  return { commentStatistic, statics, status }
}