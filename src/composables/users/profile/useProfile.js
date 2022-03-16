import { inject } from "@vue/composition-api"

export default () => {

  const userProfile = inject("userProfile")

  return { userProfile }
}