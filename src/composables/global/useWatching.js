import { watch } from "@vue/composition-api"

export default (variable, callback) => {
    watch(variable, callback, { deep: true, immediate: true })
}