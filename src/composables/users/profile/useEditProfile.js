import { inject, reactive, watch } from "vue"
import { mdiAccountEditOutline, mdiArrowLeft, mdiEyeOff, mdiEye, mdiWindowClose } from "@mdi/js";
import useUserName from "@/composables/global/useUserName";
import { gradeItems, visibleItems } from "@/composables/global/useStaticData"
import useCaptcha from "@/composables/global/useCaptcha"
import useMutation from "@/composables/global/useMutation"
import { setPreset, getPreset } from "@/composables/global/useCookie"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"
import useDebounce from "@/composables/global/useDebounce"
import useWatching from "@/composables/global/useWatching"

export default () => {

  const showSnackbar = inject("showSnackbar")
  const global = inject("global")



  const statics = {
    icons: {
      mdiAccountEditOutline,
      mdiArrowLeft, 
      mdiEyeOff, 
      mdiEye, 
      mdiWindowClose
    }, 
  }


  const userData = reactive({
    // These are just placeholders, please remember to convert them when sending to the server.
    nickname: useUserName(global.userProfile), 
    avatar: global.userProfile.avatar ? global.userProfile.avatar : "",
    is_anonymous: global.userProfile.is_anonymous ? visibleItems[0] : visibleItems[1],
    year: global.userProfile.year ? global.userProfile.year : "暂不透露",
    grade: global.userProfile.grade ? gradeItems[global.userProfile.grade] : "暂不透露",
    realname: global.userProfile.realname ? global.userProfile.realname : "",
  })

  const passwordData = reactive({
    oldPassword: "",
    newPassword: "",
    captcha: "",
  })

  const formStatus = reactive({
    nicknameFormValid: false,
    oldPasswordFormValid: false,
    newPasswordFormValid: false,
    editProfile: false, 
    loading: false,    
    captchaLoading: false,
    captchaBase64: "",
    windowStep: 0, 
    oldPasswordVisible: false, 
    newPasswordVisible: false,
  })


  
  const editProfileMutation = useMutation("/user/update_profile", {
    onMutate: () => {
      formStatus.loading = true
    }, 
    onSuccess: (response) => {
      formStatus.loading = false
      setPreset({
        id: global.userProfile.id,
        email: global.userProfile.email,
        nickname: userData.nickname, 
        avatar: userData.avatar,
        is_anonymous: userData.is_anonymous === visibleItems[0],
        year: userData.year === "暂不透露" ? 0 : userData.year, 
        grade: gradeItems.indexOf(userData.grade),
        realname: userData.realname,
      })
      global.userProfile = getPreset()
      doResetStatus()
      showSnackbar("success", "修改个人信息成功")
    }, 
    onError: (error) => {
      formStatus.loading = false
      if (isNetworkError(error.response)) {
        showSnackbar("网络连接错误")
      } else if (isValidErrorMessage(error.response.data.msg)) {
        showSnackbar("error", error.response.data.msg)
      } else {
        showSnackbar("error", "服务器发生错误")
      }
    }
  })

  const changePasswordMutation = useMutation("/user/update_password", {
    onMutate: () => {
      formStatus.loading = true
    }, 
    onSuccess: (response) => {
      formStatus.loading = false
      showSnackbar("success", "修改密码成功")
      formStatus.windowStep = 0
    }, 
    onError: (error) => {      
      formStatus.loading = false
      if (isNetworkError(error.response)) {
        showSnackbar("error", "网络连接失败")
      } else if (isValidErrorMessage(error.response.data.msg)) {
        passwordData.captcha = ""
        getCaptcha() 
        if (error.response.data.code === "UserPasswordIncorrect") {
          formStatus.windowStep = 1          
        }
        showSnackbar("error", error.response.data.msg)
      } else {
        showSnackbar("error", "服务器发生错误")
      }
    }
  })




  const doEditProfile = useDebounce(() => {
    editProfileMutation.mutate({
      nickname: userData.nickname,
      grade: gradeItems.indexOf(userData.grade),
      year: userData.year === "暂不透露" ? 0 : userData.year,
      realname: userData.realname,
      is_anonymous: userData.is_anonymous === visibleItems[0],
    })
  })

  const doChangePassword = useDebounce(() => {
    if (formStatus.oldPasswordFormValid && formStatus.newPasswordFormValid) {
      changePasswordMutation.mutate({
        old_password: passwordData.oldPassword,
        new_password: passwordData.newPassword,
        captcha: passwordData.captcha,
      })
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
        showSnackbar("网络连接错误")
      } else if (isValidErrorMessage(error.response.data.msg)) {
        showSnackbar("error", error.response.data.msg)
      } else {
        showSnackbar("error", "服务器发生错误")
      }
    }
  })  


  const doResetStatus = () => {
    formStatus.nicknameFormValid = false
    formStatus.oldPasswordFormValid = false
    formStatus.newPasswordFormValid = false
    formStatus.loading = false
    formStatus.captchaLoading = false
    formStatus.windowStep = 0
    formStatus.oldPasswordVisible = false
    formStatus.newPasswordVisible = false
    userData.nickname = useUserName(global.userProfile)
    userData.avatar = global.userProfile.avatar ? global.userProfile.avatar : ""
    userData.is_anonymous = global.userProfile.is_anonymous ? visibleItems[0] : visibleItems[1]
    userData.year = global.userProfile.year ? global.userProfile.year : "暂不透露"
    userData.grade = global.userProfile.grade ? gradeItems[global.userProfile.grade] : "暂不透露"
    userData.realname = global.userProfile.realname ? global.userProfile.realname : ""
    passwordData.oldPassword = ""
    passwordData.newPassword = ""
    passwordData.captcha = ""
  }

  watch(() => formStatus.editProfile, () => {
    if (!formStatus.editProfile) {
      doResetStatus()
    }
  })

  useWatching(() => global.userProfile, () => {
    userData.nickname = useUserName(global.userProfile)
    userData.avatar = global.userProfile.avatar ? global.userProfile.avatar : ""
    userData.is_anonymous = global.userProfile.is_anonymous ? visibleItems[0] : visibleItems[1]
    userData.year = global.userProfile.year ? global.userProfile.year : "暂不透露"
    userData.grade = global.userProfile.grade ? gradeItems[global.userProfile.grade] : "暂不透露"
    userData.realname = global.userProfile.realname ? global.userProfile.realname : ""
  })


  return { statics, userData, passwordData, formStatus, doEditProfile, doChangePassword, getCaptcha }
}