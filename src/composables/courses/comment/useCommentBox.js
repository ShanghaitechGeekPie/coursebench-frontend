import { inject, reactive } from "@vue/composition-api"
import { mdiThumbUp } from "@mdi/js"

export default () => {

  const userProfile = {
    email: "aReallyReallyReallyLongName@shanghaitech.edu.cn",
    year: 2022,
    grade: 1,
    nickname: "一个很长很长很长很长很长的名字叫做小明",
    realname: "阿仆杜拉-吴迪",
    avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1",
    show_email: true,
    show_year: true,
    show_grade: true,
    show_realname: true,
  }

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
