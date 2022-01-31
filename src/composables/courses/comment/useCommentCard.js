import { inject, reactive } from "@vue/composition-api"
import { mdiChevronDoubleRight } from "@mdi/js"

export default () => {

  const userProfile = inject("userProfile")

  const statics = reactive({
    icons: {
      mdiChevronDoubleRight
    }
  })

  const status = reactive({
        
  })

  return { userProfile, statics, status }
}