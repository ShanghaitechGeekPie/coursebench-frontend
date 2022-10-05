import { reactive, inject, onMounted } from "vue"
import { setPreset, getPreset } from "@/composables/global/useCookie"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"
import useCaptcha from "@/composables/global/useCaptcha"
import { mdiArrowLeft, mdiEye, mdiEyeOff, mdiWindowClose, mdiEmailAlertOutline } from "@mdi/js"
import useMutation from "@/composables/global/useMutation"
import useDebounce from "@/composables/global/useDebounce"


export default () => {

  const showSnackbar = inject("showSnackbar")
  const closeDialog = inject("closeDialog");
  const global = inject("global")


  const statics = {
    icons: {
      mdiArrowLeft,
      mdiEye,
      mdiEyeOff,
      mdiWindowClose,
      mdiEmailAlertOutline
    }
  }

  const userData = reactive({
    email: "",
    password: "",
    captcha: "",
    resetPasswordMethod: ""
  })



  const formStatus = reactive({
    emailFormValid: false,
    passwordFormValid: false,
    passwordVisible: false,
    loading: false,
    captchaLoading: false,
    captchaBase64: "",
    windowStep: 0,
    isResetPassword: false,
  })


  const loginMutation = useMutation("/user/login", {
    onMutate: () => {
      formStatus.loading = true
    },
    onSuccess: (response) => {
      formStatus.loading = false
      setPreset({
        id: response.data.data.id,
        email: response.data.data.email,
        nickname: response.data.data.nickname,
        avatar: response.data.data.avatar,
        is_anonymous: response.data.data.is_anonymous == undefined
          ? false : response.data.data.is_anonymous, // false = public, true = anonymous 
        // by default, no anonymous setting means public
        year: response.data.data.year,
        grade: response.data.data.grade,
        realname: response.data.data.realname,
      })
      global.isLogin = true
      global.userProfile = getPreset()
      closeDialog('login')
      showSnackbar("success", "登陆成功")
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
          if (error.response.data.code === "UserPasswordIncorrect") {
            formStatus.windowStep = 1
          } else if (error.response.data.code === "UserNotExists" || error.response.data.code === "InvalidArgument") {
            formStatus.windowStep = 0
          }
        } else {
          showSnackbar("error", "服务器发生错误")
        }
      }
    }
  })


  const resetPasswordMutation = useMutation("/user/reset_password", {
    onMutate: () => {
      formStatus.loading = true
    },
    onSuccess: (_) => {
      formStatus.loading = false
      formStatus.windowStep = 4
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


  const doLogin = useDebounce(() => {
    if (formStatus.emailFormValid && formStatus.passwordFormValid && userData.captcha !== "") {
      loginMutation.mutate({
        email: userData.email,
        password: userData.password,
        captcha: userData.captcha
      })
    }
  })

  const doResetPassword = useDebounce(() => {
    if (formStatus.emailFormValid && userData.captcha !== "") {
      resetPasswordMutation.mutate({
        email: userData.email,
        captcha: userData.captcha
      })
    }
  })


  onMounted(() => {
    getCaptcha()
  })


  return { statics, userData, formStatus, doLogin, getCaptcha, doResetPassword }
}