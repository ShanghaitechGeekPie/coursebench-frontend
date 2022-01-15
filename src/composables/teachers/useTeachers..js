import { reactive } from "@vue/composition-api"

export default () => {

  const teachers = reactive([])

  return { teachers }
} 
