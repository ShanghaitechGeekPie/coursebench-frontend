import { reactive, inject, onMounted } from "vue"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"
import useCaptcha from "@/composables/global/useCaptcha"
import { mdiArrowLeft, mdiWindowClose, mdiEmailAlertOutline } from "@mdi/js"
import useMutation from "@/composables/global/useMutation"
import useDebounce from "@/composables/global/useDebounce"


export default () => {

  const showSnackbar = inject("showSnackbar")


  const statics = {
    icons: {
      mdiArrowLeft,
      mdiWindowClose, 
      mdiEmailAlertOutline
    }
  }

  const userData = reactive({
    email: "",
    captcha: ""
  })



  const formStatus = reactive({
    emailFormValid: false,
    loading: false,
    captchaLoading: false,
    captchaBase64: "",
    windowStep: 0,
  })


  const loginMutation = useMutation("/user/reset_password", {
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
        userData.captcha = ""
        getCaptcha()
        if (isValidErrorMessage(error.response.data.msg)) {
          showSnackbar("error", error.response.data.msg)
          if (error.response.data.code === "UserNotExists" || error.response.data.code === "InvalidArgument") {
            formStatus.windowStep = 0
          }
        } else {
          showSnackbar("error", "服务器发生错误")
        }
      }
    }
  })


  const getCaptcha = useCaptcha("/user/get_captcha", {
    onMutate: () => {
      formStatus.captchaLoading = true
    }, 
    onSuccess: (response) => {
      formStatus.captchaLoading = false
      formStatus.captchaBase64 = response.data.data.img
    },
    onError: (error) => {
      formStatus.captchaLoading = false
      formStatus.captchaBase64 = ""
      if (isNetworkError(error.response)) {
        showSnackbar("error", "网络连接错误")
      } else if (isValidErrorMessage(error.response.data.msg)) {
        showSnackbar("error", error.response.data.msg)
      } else {
        showSnackbar("error", "服务器发生错误")
      }
    }
  })


  const doResetPassword = useDebounce(() => {
    if (formStatus.emailFormValid && userData.captcha !== "") {
      loginMutation.mutate({
        email: userData.email,
        captcha: userData.captcha
      })
    }
  })


  onMounted(() => {
    getCaptcha()
  })


  return { statics, userData, formStatus, doResetPassword, getCaptcha }
}