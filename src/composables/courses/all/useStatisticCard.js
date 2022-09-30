import { inject, reactive, toRefs } from "vue"
import { mdiCity, mdiChevronUp, mdiChevronDown } from "@mdi/js";


export default () => {

    const courseStatistic = inject('courseStatistic')

    const statics = {
        icons: {
            mdiCity, 
            mdiChevronUp, 
            mdiChevronDown,
        }
    }

    const status = reactive({
        showAll: true,
        ...toRefs(inject("courseFilterStatus"))
    })


    return { statics, courseStatistic, status }

}