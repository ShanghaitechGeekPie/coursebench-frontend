import { inject } from "vue"

export default () => {

    const teachers = inject('teachers')

    return { teachers }
}
