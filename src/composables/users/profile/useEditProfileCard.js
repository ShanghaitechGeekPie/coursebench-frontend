import { inject, reactive, toRefs, watchEffect } from "@vue/composition-api"

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
    ...toRefs(inject("editProfileStatus"))
  })

  const doReset = () => {
    status.profile = { ...userProfile }
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
        userProfile['show_realname'] = status.profile['show_realname']
        userProfile['show_email'] = status.profile['show_email']
        userProfile['show_grade'] = status.profile['show_grade']
        userProfile['show_year'] = status.profile['show_year']
        status.editProfile = false
      } else {
        showSnackbar("error", "修改个人资料失败")
      }
    }, 1000)
  }

  watchEffect(() => {
    if (!status.editProfile) {
      setTimeout(doReset, 100)
    }
  })

  return { statics, status, doReset, doEditProfile }
}