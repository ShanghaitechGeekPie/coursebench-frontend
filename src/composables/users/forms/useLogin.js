import { reactive, inject } from "@vue/composition-api"
import axios from "axios"
import Config from "Config"
import { setPreset } from "@/composables/global/useCookie"
import { isNetworkError } from "@/composables/global/useHttpError"

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

  const doLogin = (response) => {
    formStatus.loading = true
    const realLogin = () => {
      formStatus.loading = false
      if (response != "1234") {
        showSnackbar("error", "验证码错误！")
      } else {
        showSnackbar("success", "登陆成功")
      }
    }
    setTimeout(async () => {
      try {
        const response = await axios.post(Config.serverUrl + "/user/login", {
          email: userData.email,
          password: userData.password,
          captcha_token: "",
          captcha: ""
        })
        formStatus.loading = false
        setPreset({
          id: response.data.data.id,
          name: response.data.data.nickname
        })
        global.id = response.data.data.id
        global.name = response.data.data.nickname
      } catch (error) {
        const response = error.response
        formStatus.loading = false
        if ((!response) || (response && isNetworkError(response))) {
          showSnackbar("error", "网络连接失败")
        } else {
          showSnackbar("error", response.data.msg)
        }
        return
      }
    }, 1000)
  }

  return { userData, formStatus, doLogin }
}