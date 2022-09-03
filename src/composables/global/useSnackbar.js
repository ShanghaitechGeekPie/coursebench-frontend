import { provide, ref } from "vue"

export default () => {

  const snackbar = ref({ show: false, text: null, color: null, timeout: 5000 })

  const showSnackbar = (color, text, timeout = 5000) => {
    snackbar.value = { show: true, text: text, color: color, timeout: timeout }
  }

  // Port the function to show snackbar global
  provide("showSnackbar", showSnackbar)

  return { snackbar }
}