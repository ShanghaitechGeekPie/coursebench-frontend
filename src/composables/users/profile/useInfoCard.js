import { inject, reactive } from "@vue/composition-api"
import { mdiChevronDown, mdiChevronUp, mdiAccountEdit } from "@mdi/js";

export default () => {

    const userinfo = inject("userinfo")

    const statics = reactive({
        icons: {
            mdiChevronDown,
            mdiChevronUp,
            mdiAccountEdit,
        }
    })

    const status = inject("status")

    return { userinfo, statics, status }
}