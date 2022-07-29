import { reactive, inject } from "vue"
import { setPreset } from "@/composables/global/useCookie"
import { isNetworkError } from "@/composables/global/useHttpError"
import useMutation from "@/composables/global/useMutation"
import useFetching from "../../global/useFetching"
import useWatching from "../../global/useWatching"

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
    onSuccess: (response) => {
      setPreset({
        id: response.data.data.id,
        name: response.data.data.nickname
      })
      global.id = response.data.data.id
      global.name = response.data.data.nickname
      showSnackbar("success", "登陆成功")
    },
    onError: () => {
      if (isNetworkError(error.response)) showSnackbar("error", "网络连接失败")
      else showSnackbar("error", error.response.data.msg)
    },
    onSettled: () => {
      formStatus.loading = false
    }
  })

  const getCaptcha = () => {
    const { status, data } = useFetching(["captcha"], "/user/get_captcha", "post")
    useWatching(status, () => { formStatus.captchaBase64 = data.value ? data.value.data.img : "" })
  }

  const doLogin = (captcha) => {
    loginMutation.mutate({
      email: userData.email,
      password: userData.password,
      captcha: captcha
    })
  }

  return { userData, formStatus, doLogin, getCaptcha }
}