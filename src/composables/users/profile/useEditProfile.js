import { inject, reactive, toRefs } from "@vue/composition-api"

export default () => {

  const testValue = true // Only for test


  const showSnackbar = inject("showSnackbar")
  const userProfile = inject("userProfile")

  const statics = {
    yearItems: [2021, 2022],
    gradeItems: ["本科生", "硕士研究生", "博士研究生"],
  }

  const status = reactive({
    profile: { ...userProfile },
    loading: false,
    ...toRefs(inject("status"))
  })

  const doReset = () => {
    status.profile = { ...userProfile }
    status.editProfile = false
  }

  const doEditProfile = () => {
    status.loading = true
    setTimeout(() => {
      status.loading = false
      if (testValue) {
        userProfile.nickname = status.profile.nickname
        userProfile.year = status.profile.year
        userProfile.grade = status.profile.grade
        userProfile.realname = status.profile.realname
        doReset()
      } else {
        showSnackbar("error", "修改个人资料失败")
      }
    }, 1000)
  }

  return { statics, status, doReset, doEditProfile }
}