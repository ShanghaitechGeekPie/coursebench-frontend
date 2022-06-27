import vue from "@/main"
import { mdiCheckboxMarkedCircleOutline } from "@mdi/js"

export default () => {

  const statics = {
    backgroundLight: "#aaaaaa",
    backgroundDark: 'grey darken-3',
    icons: {
      mdiCheckboxMarkedCircleOutline,
    }
  }

  console.log(vue.$route.query)

  return { statics }
}