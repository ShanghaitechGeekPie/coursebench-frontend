import { inject, provide, reactive } from "@vue/composition-api"

export default () => {
    
  const userProfile = inject("userProfile")

  const statics = reactive({
    background: "https://cdn.luogu.com.cn/upload/image_hosting/y45o30wx.png", 
  })

  const status = reactive({
    showAll: false,
    editProfile: false, 
  })

  provide("status", status)

  return { userProfile, statics, status }
}