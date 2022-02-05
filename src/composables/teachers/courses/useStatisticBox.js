import { inject, reactive } from "@vue/composition-api"
import { mdiCommentCheck, mdiArchive } from "@mdi/js"

export default () => {

  const coursesStatistic = inject('coursesStatistic')

  const statics = {
    icons: {
      mdiCommentCheck, 
      mdiArchive, 
    }
  }

  const status = reactive({
        
  })

  return { coursesStatistic, statics, status }
}