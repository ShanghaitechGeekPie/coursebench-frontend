import { inject } from "vue"
import { mdiCamera } from "@mdi/js"
import useDebounce from "@/composables/global/useDebounce"
import useMutation from "@/composables/global/useMutation"
import { isNetworkError, isValidErrorMessage } from "@/composables/global/useHttpError"
import { setPreset, getPreset } from "@/composables/global/useCookie"

export default () => {

  const showSnackbar = inject("showSnackbar")

  // Fun fact: the injected reactive object remains reactive
  //  but other reactive objects that depend on it cant sense its changes
  const userProfile = inject("userProfile")
  const global = inject("global")

  const statics = {
    icons: {
      mdiCamera
    }, 
    avatarRules: [
      (file) => { 
        if (file && ["image/jpg", "image/jpeg", "image/png"].indexOf(file.type) == -1) {
          showSnackbar("error", "无效的文件类型")
          return false
        }
        return true
      },       
      (file) => {
        if (file && file.size > 1024 * 1024) {
          showSnackbar("error", "文件大小不能超过1MB")
          return false
        }
        return true
      }, 
    ]
  }

  const changeAvatarMutation = useMutation("/user/upload_avatar", {
    onMutate: () => {}, 
    onSuccess: (response) => {
      setPreset({
        avatar: `https://cdn.geekpie.club/course-bench/avatar/${response.data.data.avatar}`
      })
      global.userProfile = getPreset()
      showSnackbar("success", "头像修改成功")
    }, 
    onError: (error) => {
      if (isNetworkError(error.response)) {
        showSnackbar("error", "网络连接错误")
      } else if (isValidErrorMessage(error.response.data.msg)) {
        showSnackbar("error", error.response.data.msg)
      } else {
        showSnackbar("error", "服务器发生错误")
      }
    }
  }, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })

  const doChangeAvatar = useDebounce((file) => {
    if (file) {
      if (file.size < 1024 * 1024 && ["image/jpg", "image/jpeg", "image/png"].indexOf(file.type) != -1) {
        const formData = new FormData()
        formData.append("avatar", file)
        changeAvatarMutation.mutate(formData)
      }
    }
  })

  return { userProfile, statics, doChangeAvatar }
}