import { inject, reactive, toRefs } from "@vue/composition-api"

export default () => {

    const showSnackbar = inject("showSnackbar")

    const status = reactive({
        kwd: {
            oldKwd: "", 
            newKwd: "", 
            repKwd: "", 
        }, 
        loading: false, 
        step: 0, 
        ...toRefs(inject("status"))
    })

    const doReset = () => {
        status.kwd = {}
        status.editKwd = false
        status.step = 0
    }

    const testKey = "1234" // Only for test
    const doEditKwd = (response) => {
        status.loading = true
        setTimeout(() => {
            status.loading = false
            if (response != testKey) {
                showSnackbar("error", "验证码错误！")
            } else {
                doReset()
            }
        }, 1000)
    }

    return { status, doReset, doEditKwd }
}