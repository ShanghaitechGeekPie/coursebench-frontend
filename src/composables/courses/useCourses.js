import { reactive } from "@vue/composition-api"

export default () => {

  const courses = reactive([])

  return { courses }
} 
