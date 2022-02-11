import { inject, reactive, toRefs } from "@vue/composition-api"
import { mdiChevronDown, mdiChevronUp, mdiAccountEditOutline } from "@mdi/js";

export default () => {

  const userProfile = inject("userProfile")

  const statics = {
    icons: {
      mdiChevronDown,
      mdiChevronUp,
      mdiAccountEditOutline,
    }, 
  }

  const status = reactive({
    ...toRefs(inject("status"))
  })

  return { userProfile, statics, status }
}