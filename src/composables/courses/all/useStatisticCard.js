import { inject, reactive, toRefs } from "vue"
import { mdiCity } from "@mdi/js";


export default () => {

    const courseStatistic = inject('courseStatistic')

    const statics = {
        icons: {
            mdiCity, 
        }
    }

    const status = reactive({
        ...toRefs(inject("courseStatus"))
    })


    return { statics, courseStatistic, status }

}