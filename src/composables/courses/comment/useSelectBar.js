import { inject } from "vue"

import {sortStatics} from "@/composables/global/useCommentSort";

export default () => {

    const teachers = inject('groups')
    const status = inject("courseCommentStatus")
    const statics = {
        ...sortStatics,
    }

    return { teachers, status, statics }
}
