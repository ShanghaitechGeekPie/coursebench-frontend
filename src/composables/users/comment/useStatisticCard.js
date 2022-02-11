import { inject, reactive } from "@vue/composition-api"
import { mdiThumbUpOutline, mdiCommentCheckOutline } from "@mdi/js"

export default () => {

  const commentStatistic = inject('commentStatistic')

  const statics = {
    icons: {
      mdiThumbUpOutline, 
      mdiCommentCheckOutline
    }
  }

  const status = reactive({
        
  })

  return { commentStatistic, statics, status }
}