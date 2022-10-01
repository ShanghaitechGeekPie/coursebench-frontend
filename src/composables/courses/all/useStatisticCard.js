import { inject, reactive } from "vue"
import { mdiCity, mdiChevronUp, mdiChevronDown } from "@mdi/js";
import useRecordWatch from "@/composables/global/useRecordWatch";
import { compare } from "@/composables/global/useArrayUtils";
import useDebounce from "@/composables/global/useDebounce";

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

    useRecordWatch(courseFilterStatus, useDebounce((lastStatus) => {
        if (courseFilterStatus.selected != lastStatus.selected) {
            if (courseFilterStatus.selected.length === 0) {
                status.selectAll = false
                status.selectNotAll = true
            } else if (compare(courseFilterStatus.selected.filter(key => key != "__ob__"), 
              Object.keys(courseStatistic.count).filter(key => key != "__ob__"))) {
                status.selectAll = true
                status.selectNotAll = false
            }            
        }
    }))

    useRecordWatch(status, useDebounce((lastStatus) => {
        if (status.selectAll != lastStatus.selectAll) {
            if (status.selectAll) {
                courseFilterStatus.selected = Object.keys(courseStatistic.count).filter(key => key != "__ob__")
            } else {
                courseFilterStatus.selected = []
            }
        } else if (status.selectNotAll != lastStatus.selectNotAll) {
            if (status.selectNotAll) {
                courseFilterStatus.selected = []
            } else {
                courseFilterStatus.selected = Object.keys(courseStatistic.count).filter(key => key != "__ob__")
            }
        }
    }))


    return { statics, courseStatistic, courseFilterStatus, status }

}