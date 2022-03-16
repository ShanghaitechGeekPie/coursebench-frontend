import { reactive } from "@vue/composition-api"


export default () => {

    const status = reactive({
        loading: false, 
    })

    const doCheckActive = (id, code) => {

    }

    return { status, doCheckActive }
}