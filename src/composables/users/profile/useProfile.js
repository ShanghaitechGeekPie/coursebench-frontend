import { inject } from "vue"
import useWatching from "@/composables/global/useWatching"

export default () => {

  const userProfile = inject("userProfile")

  return { userProfile }
}