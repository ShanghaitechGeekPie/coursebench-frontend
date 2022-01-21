import { provide, reactive } from "@vue/composition-api"

export default () => {
    
    // const testAvatar = "<img src='https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1'></img>"
    const getProfile = () => {
        const info = {
            email: "1@shanghaitech.edu.cn",
            year: 2022,
            grade: 1,
            nickname: "小明",
            realname: "吴迪",
            avatar: '<span class="text-sm-h3 text-h5">123</span>',
        }        

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