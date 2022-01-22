import { ref, inject } from "@vue/composition-api"

export default () => {

  // Get the function to show snackbar from global/useSnackbar.js
  const showSnackbar = inject("showSnackbar")

  const register = ref({
    loading: false,
    step: 0,
    dialog: false,
    year: 2022,
    grade: 1,
    year_items: [2022, 2021],
    grade_items: [1, 2, 3, 4]
  })

  const doRegister = (response) => {
    register.value.loading = true
    setTimeout(() => {
      register.value.loading = false
      if (response != "1234") {
        showSnackbar("error", "验证码错误！")
      } else {
        register.value.dialog = false
        register.value.step = 0
      }
    }, 1000)
  }

  return { register, doRegister }
}