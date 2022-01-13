import { reactive, inject } from "@vue/composition-api"

export default () => {
  const showSnackbar = inject("showSnackbar")
  const login = reactive({
    loading: false,
    step: 0,
    dialog: false,
  })
  const doLogin = (response) => {
    login.loading = true
    setTimeout(() => {
      login.loading = false
      if (response != "1234") {
        showSnackbar("error", "验证码错误！")
      } else {
        login.dialog = false
        login.step = 0
      }
    }, 1000)
  }
  return { login, doLogin }
}