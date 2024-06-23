import { inject, onMounted, onUnmounted, reactive, watch } from "vue"
import { mdiCity, mdiChevronUp, mdiChevronDown } from "@mdi/js";
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

    watch(() => courseFilterStatus.selected, useDebounce((to, from) => {
        if (courseFilterStatus.selected.length === 0) {
            status.selectAll = false
            status.selectNotAll = true
        } else if (courseFilterStatus.selected.filter(key => key != "__ob__").length 
            === Object.keys(courseStatistic.value.count).filter(key => key != "__ob__").length) {
            status.selectAll = true
            status.selectNotAll = false
        } else {
            status.selectAll = false
            status.selectNotAll = false
        }
    }))

    watch(() => window.innerWidth, useDebounce((to, from) => {
        updateShowAll();
    }))

    onMounted(() => {
        updateShowAll();
        window.addEventListener('resize', updateShowAll, { passive: true })
        if (courseFilterStatus.selected.length === 0) {
            status.selectAll = false
            status.selectNotAll = true
        } else if (courseFilterStatus.selected.filter(key => key != "__ob__").length 
            === Object.keys(courseStatistic.value.count).filter(key => key != "__ob__").length) {
            status.selectAll = true
            status.selectNotAll = false
        }
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateShowAll, { passive: true })
    })

    const updateShowAll = () => {
        status.showAll = window.innerWidth >= 600;
    }

    return { statics, courseStatistic, courseFilterStatus, status }

}