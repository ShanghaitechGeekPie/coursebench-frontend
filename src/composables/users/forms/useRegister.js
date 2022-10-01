import { reactive, inject, onMounted } from "vue"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"
import useCaptcha from "@/composables/global/useCaptcha"
import { mdiArrowLeft, mdiEye, mdiEyeOff, mdiWindowClose, mdiEmailAlertOutline } from "@mdi/js"
import useMutation from "@/composables/global/useMutation"
import { gradeItems } from "@/composables/global/useStaticData"
import useDebounce from "@/composables/global/useDebounce"

export default () => {

  const showSnackbar = inject("showSnackbar")


  const statics = {
    icons: {
      mdiArrowLeft,
      mdiEye,
      mdiEyeOff,
      mdiWindowClose,
      mdiEmailAlertOutline
    },
  }

  const userData = reactive({
    email: "",
    username: "",
    password: "",
    year: undefined,
    grade: undefined,
  })

  const formStatus = reactive({
    emailFormValid: false,
    usernameFormValid: false,
    passwordFormValid: false,
    passwordVisible: false,
    loading: false,
    captchaLoading: false,
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
      } else if (isValidErrorMessage(error.response.data.msg)) {
        showSnackbar("error", error.response.data.msg)        
        userData.captcha = ""
        getCaptcha()
        if (error.response.data.code === "UserAlreadyExists" || error.response.data.code === "UserEmailDuplicated") {
          formStatus.windowStep = 0;
        }
      } else {
        showSnackbar("error", "服务器发生错误")
      }
    }
  });

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

  const doRegister = useDebounce(() => {
    if (formStatus.emailFormValid && formStatus.passwordFormValid && 
      formStatus.usernameFormValid && userData.captcha !== "" && userData.year && userData.grade
    ) {
      console.log(userData)
      registerMutation.mutate({
        nickname: userData.username,
        email: userData.email,
        password: userData.password,
        year: userData.year === "暂不透露" ? 0 : userData.year,
        grade: gradeItems.indexOf(userData.grade),
        captcha: userData.captcha
      })
    }
  })

  onMounted(() => {
    getCaptcha()
  })

  return { statics, userData, formStatus, doRegister, getCaptcha }
}