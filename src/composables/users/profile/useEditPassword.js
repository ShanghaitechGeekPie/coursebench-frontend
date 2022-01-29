import { inject, reactive, toRefs } from "@vue/composition-api"

export default () => {

  const testKey = "1234" // Only for test
    

  const showSnackbar = inject("showSnackbar")

  const status = reactive({
    password: {
      oldPassword: "", 
      newPassword: "", 
      repPassword: "", 
    }, 
    loading: false, 
    step: 0, 
    ...toRefs(inject("status"))
  })

  const doReset = () => {
    status.password = {
      oldPassword: "", 
      newPassword: "", 
      repPassword: "", 
    }
    status.editPassword = false
    status.step = 0
  }

  const doEditPassword = (response) => {
    status.loading = true
    setTimeout(() => {
      status.loading = false
      if (response != testKey) {
        showSnackbar("error", "验证码错误！")
      } else {
        doReset()
      }
    }, 1000)
  }

  return { status, doReset, doEditPassword }
}