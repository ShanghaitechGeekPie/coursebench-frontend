import { reactive, inject, toRefs } from "@vue/composition-api"

export default () => {

  const statics = {

  }

  const status = reactive({
    ...toRefs(inject("commentStatus"))
  })

  return { statics, status }
}