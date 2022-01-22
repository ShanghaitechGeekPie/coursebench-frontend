import { inject, reactive } from "@vue/composition-api"

export default () => {

    const comtinfo = inject('comtinfo')

    const statics = reactive({
        
    })

    const status = reactive({
        
    })

    return { comtinfo, statics, status }
}