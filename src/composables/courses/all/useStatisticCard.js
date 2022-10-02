import { inject, reactive, watch } from "vue"
import { mdiCity, mdiChevronUp, mdiChevronDown } from "@mdi/js";
import useDebounce from "@/composables/global/useDebounce";
import { notEqual } from "@/composables/global/useArrayUtils"

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
        selectAll: false,
        selectNotAll: false
    })

    const courseFilterStatus = inject("courseFilterStatus")

    watch(() => courseFilterStatus.selected, useDebounce((to, from) => {
        if (courseFilterStatus.selected.length === 0) {
            status.selectAll = false
            status.selectNotAll = true
        } else if (courseFilterStatus.selected.filter(key => key != "__ob__").length 
            === Object.keys(courseStatistic.count).filter(key => key != "__ob__").length) {
            status.selectAll = true
            status.selectNotAll = false
        } else {
            status.selectAll = false
            status.selectNotAll = false
        }
    }))

    // Abandoned @since 2021-05-31: this is buggy and is based on a bug
    // useRecordWatch(courseFilterStatus, useDebounce((lastStatus) => {
    //     if (courseFilterStatus.selected != lastStatus.selected) {
    //         if (courseFilterStatus.selected.length === 0) {
    //             status.selectAll = false
    //             status.selectNotAll = true
    //         } else if (courseFilterStatus.selected.filter(key => key != "__ob__").length 
    //             === Object.keys(courseStatistic.count).filter(key => key != "__ob__").length) {
    //             status.selectAll = true
    //             status.selectNotAll = false
    //         } else {
    //             status.selectAll = false
    //             status.selectNotAll = false
    //         }
    //     }
    // }))

    return { statics, courseStatistic, courseFilterStatus, status }

}