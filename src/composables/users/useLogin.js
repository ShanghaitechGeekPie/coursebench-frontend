import { ref, inject } from "@vue/composition-api"

export default () => {

  // Get the function to show snackbar from useSnackbar.js
  const showSnackbar = inject("showSnackbar")

  const login = ref({
    loading: false,
    step: 0,
    dialog: false,
  })

  const doLogin = (response) => {
    login.value.loading = true
    setTimeout(() => {
      login.value.loading = false
      if (response != "1234") {
        showSnackbar("error", "验证码错误！")
      } else {
        login.value.dialog = false
        login.value.step = 0
      }
    }, 1000)
  }

  return { login, doLogin }
}