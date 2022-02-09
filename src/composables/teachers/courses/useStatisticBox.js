import { inject, reactive } from "@vue/composition-api"
import { mdiArchive } from "@mdi/js"

export default () => {

  const coursesStatistic = inject('coursesStatistic')

  const statics = {
    icons: {
      mdiArchive, 
    }
  }

  const status = reactive({
        
  })

  return { coursesStatistic, statics, status }
}