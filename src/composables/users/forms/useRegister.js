import { reactive, inject, onMounted } from "vue"
import { isNetworkError } from "@/composables/global/useHttpError"
import useCaptcha from "@/composables/global/useCaptcha"
import { mdiArrowLeft, mdiEye, mdiEyeOff, mdiWindowClose, mdiEmailAlertOutline } from "@mdi/js"
import useMutation from "@/composables/global/useMutation"
import { gradeItems, yearItems } from "@/composables/global/useStaticData"

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
    yearItems, 
    gradeItems
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
    passwordFormValid: false,
    passwordVisible: false,
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
        userData.captcha = ""
        getCaptcha()
        if (error.response.data.code === "UserAlreadyExists" || error.response.data.code === "UserEmailDuplicated") {
          formStatus.windowStep = 0;
        }                
        showSnackbar("error", error.response.data.msg)
      }
    }
  });

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

  const doRegister = () => {
    registerMutation.mutate({
      email: userData.email,
      password: userData.password,
      year: userData.year,
      grade: statics.gradeItems.indexOf(userData.grade),
      captcha: userData.captcha
    })
  }

  onMounted(() => {
    getCaptcha()
  })

  return { statics, userData, formStatus, doRegister, getCaptcha }
}