import { provide, reactive } from "@vue/composition-api"

export default () => {

  const snackbar = reactive({ show: false, text: null, color: null })

  const showSnackbar = (color, text) => {
    snackbar.show = true
    snackbar.text = text
    snackbar.color = color
  }

  // Port the function to show snackbar global
  provide("showSnackbar", showSnackbar)

  return { snackbar }
}