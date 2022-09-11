import { inject } from "vue"

export default () => {

  const userProfile = inject("userProfile")

  return { userProfile }
}