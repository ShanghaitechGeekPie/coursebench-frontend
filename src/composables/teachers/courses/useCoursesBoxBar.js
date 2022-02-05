import { inject, reactive } from "@vue/composition-api"
import { mdiChevronDoubleRight } from "@mdi/js"

export default () => {

  const teacherDetail = inject("teacherDetail")

  const statics = {
    icons: {
      mdiChevronDoubleRight, 
    }
  }

  const status = reactive({

  })

  return { teacherDetail, statics, status }
}