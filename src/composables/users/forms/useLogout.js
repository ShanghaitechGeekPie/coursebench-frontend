import { clearPreset } from "@/composables/global/useCookie"

export default () => {

  const doLogout = () => clearPreset()

  return { doLogout }
}