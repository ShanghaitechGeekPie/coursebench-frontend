import { inject, reactive, toRefs, watchEffect } from "@vue/composition-api"

export default () => {

  const statics = {
    
  }

  const status = reactive({
    step: 0,
    password: {}, 
    ...toRefs(inject("status"))
  })

  watchEffect(() => {
    if (!status.editProfile) {
      status.step = 0
    }
  })

  return { statics, status }
}