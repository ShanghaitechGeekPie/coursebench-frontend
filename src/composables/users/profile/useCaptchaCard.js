import { inject, reactive, toRefs } from "@vue/composition-api"

export default () => {

  const testKey = 1234 // Just for test


  const showSnackbar = inject("showSnackbar")

  const statics = {
    
  }

  const status = reactive({
    loading: false,
    ...toRefs(inject("status"))
  })

  const doEditPassword = (response, password) => {
    status.loading = true
    setTimeout(() => {
      status.loading = false
      if (response != testKey) {
        showSnackbar("error", "验证码错误！")
      } else {
        status.editProfile = false
      }
    }, 1000)
  }

  return { statics, status, doEditPassword }
}