import { provide, reactive, ref } from "@vue/composition-api"

export default () => {

  const snackbar = reactive({ show: false, text: null, color: null, timeout: 5000 })

  const showSnackbar = (color, text, timeout) => {
    snackbar.value = { show: true, text: text, color: color, timeout: timeout }
  }

  // Port the function to show snackbar global
  provide("showSnackbar", showSnackbar)

  return { snackbar }
}