import { reactive, inject } from "vue"
import { setPreset } from "@/composables/global/useCookie"
import { isNetworkError } from "@/composables/global/useHttpError"
import { useMutation } from "vue-query"
import axios from "axios"
import Config from "Config"

export default () => {

  const showSnackbar = inject("showSnackbar")

  const userData = reactive({
    email: "",
    password: ""
  })

  const formStatus = reactive({
    emailFormValid: false,
    passwordFormValid: false,
    loading: false,
    windowStep: 0
  })

  const doLogin = () => {
    formStatus.loading = true
    useMutation(() => axios.post(Config.serverUrl + "/user/login"), {
      email: userData.email,
      password: userData.password,
      captcha_token: "",
      captcha: ""
    }, {
      onMutate: () => {
        formStatus.loading = true
      },
      onSuccess: (response) => {
        setPreset({
          id: response.data.data.id,
          nickname: response.data.data.nickname
        })
        global.id = response.data.data.id
        global.name = response.data.data.nickname
        showSnackbar("success", "登录成功")
      },
      onError: (response) => {
        formStatus.loading = false
        if (isNetworkError(response)) {
          showSnackbar("error", "网络连接失败")
        } else {
          showSnackbar("error", response.data.msg)
        }
      }, 
      onSettled: () => {
        formStatus.loading = false
      }
    })
  }

  return { userData, formStatus, doLogin }
}