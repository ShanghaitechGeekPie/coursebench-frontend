import { reactive, inject } from "@vue/composition-api"

export default () => {

  // Get the function to show snackbar from global/useSnackbar.js
  const showSnackbar = inject("showSnackbar")

  const userData = reactive({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    year: 2022,
    grade: 1,
    yearItems: [2022, 2021],
    gradeItems: [1, 2, 3, 4],
  })

  const formStatus = reactive({
    // For first two steps, the validation is handled by the form itself.
    // After the validation and registration in the third step,
    // the window will automatically move to the latest step.
    emailFormValid: false,
    passwordFormValid: false,
    loading: false,
    windowStep: 0
  })

  const doRegister = (response) => {
    formStatus.loading = true
    setTimeout(() => {
      formStatus.loading = false
      if (response != "1234") {
        showSnackbar("error", "验证码错误！")
      } else {
        $emit('update:dialog', false)
        formStatus.windowStep = 0
      }
    }, 1000)
  }

  return { userData, formStatus, doRegister }
}