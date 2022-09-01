import { reactive, inject, onMounted } from "vue"
import { isNetworkError } from "@/composables/global/useHttpError"
import useMutation from "@/composables/global/useMutation"
import useFetching from "@/composables/global/useFetching"
import useWatching from "@/composables/global/useWatching"

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
    captchaBase64: "",
    windowStep: 0
  })

  const registerMutation = useMutation("/user/register", {
    onMutate: () => {
      formStatus.loading = true
    }, 
    onSuccess: (_) => {
      formStatus.loading = false
      formStatus.windowStep += 1
    }, 
    onError: (error) => {
      formStatus.loading = false
      if (isNetworkError(error.response)) {
        showSnackbar("error", "网络连接失败")
      } else {
        showSnackbar("error", error.response.data.msg)
      }
    }
  });

  const getCaptcha = () => {
    const { status, data } = useFetching(["register", "captcha"], "/user/get_captcha", "post")
    useWatching(status, () => { formStatus.captchaBase64 = data.value ? data.value.data.img : "" })
  }  

  const doRegister = (captchaValue) => {
    registerMutation.mutate({
      email: userData.email,
      password: userData.password,
      year: userData.year,
      grade: userData.grade,
      captcha: captchaValue
    })
  }

  onMounted(() => {
    getCaptcha()
  })

  return { userData, formStatus, doRegister }
}