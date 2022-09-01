import { reactive, inject, onMounted } from "vue"
import { setPreset } from "@/composables/global/useCookie"
import { isNetworkError } from "@/composables/global/useHttpError"
import useMutation from "@/composables/global/useMutation"
import useFetching from "@/composables/global/useFetching"
import useWatching from "@/composables/global/useWatching"

export default () => {

  const showSnackbar = inject("showSnackbar")

  const userData = reactive({ email: "", password: "" })

  const formStatus = reactive({
    emailFormValid: false,
    passwordFormValid: false,
    loading: false,
    captchaBase64: "",
    windowStep: 0
  })

  const loginMutation = useMutation("/user/login", {
    onMutate: () => {
      formStatus.loading = true
    },
    onSuccess: (data) => {
      formStatus.loading = false
      setPreset({
        id: data.response.data.data.id,
        name: data.response.data.data.nickname
      })
      global.id = data.response.data.data.id
      global.name = data.response.data.data.nickname
      showSnackbar("success", "登陆成功")
    },
    onError: (error) => {
      formStatus.loading = false
      if (isNetworkError(error.response)) showSnackbar("error", "网络连接失败")
      else showSnackbar("error", error.response.data.msg)
    }
  })

  const getCaptcha = () => {
    const { status, data } = useFetching(["login", "captcha"], "/user/get_captcha", "post")
    useWatching(status, () => { formStatus.captchaBase64 = data.value ? data.value.data.img : "" })
  }

  const doLogin = (captchaValue) => {
    loginMutation.mutate({
      email: userData.email,
      password: userData.password,
      captcha: captchaValue
    })
  }

  onMounted(() => {
    getCaptcha()
  })

  return { userData, formStatus, doLogin }
}