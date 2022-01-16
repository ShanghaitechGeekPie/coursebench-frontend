import { provide, ref } from "@vue/composition-api"

export default () => {

  const snackbar = ref({ show: false, text: null, color: null })

  const showSnackbar = (color, text) => {
    snackbar.value = {show: true, text: text, color: color}
  }

  // Port the function to show snackbar global
  provide("showSnackbar", showSnackbar)

  return { snackbar }
}