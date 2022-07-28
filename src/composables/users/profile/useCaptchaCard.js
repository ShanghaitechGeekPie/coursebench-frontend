import { inject, reactive, toRefs } from "vue"

export default () => {

  const testKey = 1234 // Just for test


  const showSnackbar = inject("showSnackbar")

  const status = reactive({
    loading: false,
    ...toRefs(inject("editProfileStatus"))
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

  return { status, doEditPassword }
}