import { reactive, inject } from "@vue/composition-api"

export default () => {

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
    emailFormValid: false,
    passwordFormValid: false,
    loading: false,
    windowStep: 0
  })

  const doRegister = (response) => {
    formStatus.loading = true
    const realRegister = () => {
      formStatus.loading = false
      if (response != "1234") {
        showSnackbar("error", "验证码错误！", 5000)
      } else {
        formStatus.windowStep += 1
      }
    }
    setTimeout(realRegister, 1000)
  }

  return { userData, formStatus, doRegister }
}