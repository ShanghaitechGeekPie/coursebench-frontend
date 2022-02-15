import { reactive, watchEffect } from "@vue/composition-api"

export default () => {

  const status = reactive({
    password: {
      oldPassword: "",
      newPassword: "",
      repPassword: "",
    }, 
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

  return { status, doReset }
}