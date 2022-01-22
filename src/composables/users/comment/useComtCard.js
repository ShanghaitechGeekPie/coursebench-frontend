import { inject, reactive } from "@vue/composition-api"

export default () => {

    const userinfo = inject("userinfo")

    const statics = reactive({
        
    })

    const status = reactive({
        
    })

    return { userinfo, statics, status }
}