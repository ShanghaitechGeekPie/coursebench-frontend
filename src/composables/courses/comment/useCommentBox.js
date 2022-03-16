import { inject, reactive } from "@vue/composition-api"
import { mdiThumbUp } from "@mdi/js"

export default () => {

  const userProfile = inject("userProfile")
  const scoreDims = inject("scoreDims")

  const statics = reactive({
    icons: {
      mdiThumbUp
    }
  })

  const status = reactive({
    liked: Math.random() > 0.5,
    likedNum: 32,
  })

  return { userProfile, statics, status, scoreDims}
}
