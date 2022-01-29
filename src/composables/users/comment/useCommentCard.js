import { inject, reactive } from "@vue/composition-api"

export default () => {

  const commentUserProfile = inject("commentUserProfile")

  const statics = reactive({
        
  })

  const status = reactive({
        
  })

  return { commentUserProfile, statics, status }
}