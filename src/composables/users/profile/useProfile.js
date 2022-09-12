import { inject } from "vue"

export default () => {

  // Fun fact: the injected reactive object remains reactive
  //  but other reactive objects that depend on it cant sense its changes
  const userProfile = inject("userProfile")

  return { userProfile }
}