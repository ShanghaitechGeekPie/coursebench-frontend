import { watch } from "vue"

export default (variable, callback) => {
    watch(variable, callback, { deep: true, immediate: true })
}