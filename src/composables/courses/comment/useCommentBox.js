import { inject, reactive } from "@vue/composition-api"
import { mdiThumbUp } from "@mdi/js"

export default () => {

  const userProfile = inject("userProfile")

  const statics = reactive({
    icons: {
      mdiThumbUp
    },
    scoreNames: [
        "课程质量", "课业负担", "考核难度", "给分情况"
    ]
  })

  const status = reactive({
    liked: Math.random() > 0.5,
    likedNum: 32,
  })

  return { userProfile, statics, status }
}
