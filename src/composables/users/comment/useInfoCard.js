import { inject, reactive } from "@vue/composition-api"
import { mdiThumbUp, mdiCommentCheck } from "@mdi/js"

export default () => {

    const comtinfo = inject('comtinfo')

    const statics = reactive({
        icons: {
            mdiThumbUp, 
            mdiCommentCheck
        }
    })

    const status = reactive({
        
    })

    return { comtinfo, statics, status }
}