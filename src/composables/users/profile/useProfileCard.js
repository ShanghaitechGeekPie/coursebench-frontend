import { inject, reactive, toRefs } from "@vue/composition-api"
import { mdiChevronDown, mdiChevronUp, mdiAccountEdit } from "@mdi/js";

export default () => {

  const userProfile = inject("userProfile")

  const statics = reactive({
    icons: {
      mdiChevronDown,
      mdiChevronUp,
      mdiAccountEdit,
    }, 
  })

  const status = reactive({
    ...toRefs(inject("status"))
  })

  return { userProfile, statics, status }
}