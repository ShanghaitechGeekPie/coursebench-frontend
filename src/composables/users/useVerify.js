import { mdiCheckboxMarkedCircleOutline } from "@mdi/js"
import { useRoute } from "@/router/migrateRouter"

export default () => {

  const route = useRoute()

  const statics = {
    backgroundLight: "#aaaaaa",
    backgroundDark: 'grey darken-3',
    icons: {
      mdiCheckboxMarkedCircleOutline,
    }
  }

  console.log(route.query)

  return { statics }
}