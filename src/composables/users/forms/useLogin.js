import { reactive, inject, onMounted } from "vue"
import { setPreset } from "@/composables/global/useCookie"
import { isNetworkError } from "@/composables/global/useHttpError"
import useCaptcha from "@/composables/global/useCaptcha"
import { mdiArrowLeft, mdiEye, mdiEyeOff, mdiWindowClose } from "@mdi/js"
import useMutation from "@/composables/global/useMutation"


export default () => {

  const showSnackbar = inject("showSnackbar")


  const statics = {
    icons: {
      mdiArrowLeft,
      mdiEye,
      mdiEyeOff, 
      mdiWindowClose
    }
  }

  const userData = reactive({
    email: "",
    password: "",
    captcha: ""
  })



  const formStatus = reactive({
    emailFormValid: false,
    passwordFormValid: false,
    passwordVisible: false,
    loading: false,
    captchaBase64: "",
    windowStep: 0,
  })


  const loginMutation = useMutation("/user/login", {
    onMutate: () => {
      formStatus.loading = true
    },
    onSuccess: (response) => { // ! By wxj, not tested yet
      formStatus.loading = false
      setPreset({
        id: response.data.data.id,
        name: response.data.data.nickname
      })
      global.id = response.data.data.id
      global.name = response.data.data.nickname
      showSnackbar("success", "登陆成功")
    },
    onError: (error) => {
      formStatus.loading = false
      userData.captcha = ""
      getCaptcha()
      if (isNetworkError(error.response)) {
        showSnackbar("error", "网络连接失败")
      } else {
        if (error.response.data.code === "UserPasswordIncorrect") {
          formStatus.windowStep = 1
        } else if (error.response.data.code === "UserNotExists" || error.response.data.code === "InvalidArgument") {
          formStatus.windowStep = 0
        }
        showSnackbar("error", error.response.data.msg)
      }
    }
  })


  const getCaptcha = useCaptcha("/user/get_captcha", {
    onSuccess: (response) => {
      formStatus.captchaBase64 = response.data.data.img
    },
    onError: (error) => {
      if (isNetworkError(error)) {
        showSnackbar("error", "网络连接失败")
      } else {
        showSnackbar(error.response.data.message)
      }
    }
  })


  const doLogin = () => {
    loginMutation.mutate({
      email: userData.email,
      password: userData.password,
      captcha: userData.captcha
    })
  }


  onMounted(() => {
    getCaptcha()
  })


  return { statics, userData, formStatus, doLogin, getCaptcha }
}