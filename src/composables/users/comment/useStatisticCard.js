import { inject, reactive } from "@vue/composition-api"
import { mdiThumbUp, mdiCommentCheck } from "@mdi/js"

export default () => {

  const commentStatistic = inject('commentStatistic')

  const statics = {
    icons: {
      mdiThumbUp, 
      mdiCommentCheck
    }
  }

  const status = reactive({
        
  })

  return { commentStatistic, statics, status }
}