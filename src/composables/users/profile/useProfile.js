import { provide, reactive } from "@vue/composition-api"

export default () => {
    
    const testInfo = {
        email: "1@shanghaitech.edu.cn",
        year: 2022,
        grade: 1,
        nickname: "小明",
        realname: "吴迪",
        avatar: "https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1",
    } // Just for test
    const getProfile = () => {
        const info = testInfo

        return info
    }

    const userinfo = reactive(getProfile())

    const statics = reactive({
        background: "https://cdn.luogu.com.cn/upload/image_hosting/y45o30wx.png", 
    })

    const status = reactive({
        showAll: false,
        editInfo: false, 
        editKwd: false,
    })

    provide("userinfo", userinfo)
    provide("status", status)

    return { userinfo, statics, status }
}