import { inject, reactive, toRefs } from "@vue/composition-api"

export default () => {

    const showSnackbar = inject("showSnackbar")
    const userinfo = inject("userinfo")
    
    const statics = {
        yearItems: [ 2021, 2022 ], 
        gradeItems: [ 1, 2, 3, 4 ]
    }

    const status = reactive({
        info: { ...userinfo }, 
        loading: false, 
        ...toRefs(inject("status"))
    })

    const doReset = () => {
        status.info = { ...userinfo }
        status.editInfo = false
    }

    const testValue = false // Only for test
    const doEditInfo = () => {
        status.loading = true
        setTimeout(() => {
            status.loading = false
            if (testValue) {
                userinfo.nickname = status.info.nickname
                userinfo.year = status.info.year
                userinfo.grade = status.info.grade
                userinfo.realname = status.info.realname
                doReset()
            } else {
                showSnackbar("error", "修改个人资料失败")
            }
        }, 1000)
    }

    return { statics, status, doReset, doEditInfo }
}