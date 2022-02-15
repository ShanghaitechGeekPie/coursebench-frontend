import { provide, reactive, watchEffect } from "@vue/composition-api"
import { mdiAccountEditOutline } from "@mdi/js";

export default () => {

  const statics = {
    icons: {
      mdiAccountEditOutline,
    }, 
  }

  const status = reactive({
    step: 0,
    password: {}, 
    editProfile: false, 
  })

  watchEffect(() => {
    if (!status.editProfile) {
      setTimeout(() => {
        status.step = 0
      }, 200)
    }
  })

  provide("editProfileStatus", status)

  return { statics, status }
}