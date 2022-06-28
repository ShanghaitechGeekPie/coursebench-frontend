import { reactive, inject } from "@vue/composition-api"

export default () => {

  const closeDialog = inject("closeDialog")
  const showSnackbar = inject("showSnackbar")

  const userData = reactive({
    email: "",
    password: ""
  })

  const formStatus = reactive({
    emailFormValid: false,
    passwordFormValid: false,
    loading: false,
    windowStep: 0
  })

  const doLogin = (response) => {
    formStatus.loading = true
    const realLogin = () => {
      formStatus.loading = false
      if (response != "1234") {
        showSnackbar("error", "验证码错误！")
      } else {
        closeDialog("login")
        formStatus.windowStep = 0
      }
    }
    setTimeout(realLogin, 1000)
  }

  return { userData, formStatus, doLogin }
}