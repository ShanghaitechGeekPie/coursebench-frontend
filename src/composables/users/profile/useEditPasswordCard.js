import { inject, reactive, toRefs, watchEffect } from "@vue/composition-api"

export default () => {

  const statics = {

  }

  const status = reactive({
    password: {
      oldPassword: "",
      newPassword: "",
      repPassword: "",
    }, 
    ...toRefs(inject("status"))
  })

  const doReset = () => {
    status.password = {
      oldPassword: "",
      newPassword: "",
      repPassword: "",
    }
  }

  watchEffect(() => {
    if (!status.editProfile) {
      setTimeout(doReset, 100)
    }
  })

  return { statics, status, doReset }
}