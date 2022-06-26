import { ref } from "@vue/composition-api"

export default () => {

  const searchText = ref("")

  const regExpMode = ref(false)

  const isRegExpError = ref(false)

  const handleSearch = (data) => {
    if (!regExpMode.value) {
      isRegExpError.value = false
      return data.filter((item) => item.name.includes(searchText.value))
    }
    else {
      isRegExpError.value = false
      try { eval(searchText.value) } catch { isRegExpError.value = true; return [] }
      return data.filter((item) => item.name.match(eval(searchText.value)))
    }
  }

  return { searchText, regExpMode, isRegExpError, handleSearch }
}
