import { inject, reactive } from "@vue/composition-api"

export default () => {

    const usercomt = inject('usercomt')

    const statics = reactive({
        
    })

    const status = reactive({
        
    })

    return { usercomt, statics, status }
}