import { reactive } from '@vue/composition-api'

function resetInfo(origin, target) {
    origin.year = target.year
    origin.grade = target.grade
    origin.nickname = target.nickname
    origin.realname = target.realname
}

export default () => {

    const userinfo = reactive({
        email: "1@shanghaitech.edu.cn",
        year: 2022,
        grade: 1,
        nickname: "小明",
        realname: "吴迪",
        background: "https://cdn.luogu.com.cn/upload/image_hosting/y45o30wx.png", 
        avatar: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.JdnTbs1HeiRA1zP2s7hxcgAAAA?pid=ImgDet&rs=1',
    })

    const temp = reactive({
        update: false, // updating info
        dialog: false, // having a dialog
        show: false, // showing all the info
        yearItems: [2022, 2021],
        gradeItems: [1, 2, 3, 4],
        submit() { // submit info update

            return false
        }, 
        cancel() { // cancel info update
            resetInfo(this, userinfo)
            temp.update = false
        }, 
        upload() { // upload new avatar

        }, 
        ...userinfo
    })

    return { userinfo, temp }
}