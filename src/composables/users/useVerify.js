import { 
  mdiCheckboxMarkedCircleOutline, 
  mdiCloseCircleOutline,
} from "@mdi/js"
import { useRoute } from "@/router/migrateRouter"
import { reactive, onMounted } from "vue"
import { isNetworkError } from "@/composables/global/useHttpError"
import useMutation from "@/composables/global/useMutation"

export default () => {

  const route = useRoute()

  const statics = {
    backgroundLight: "#aaaaaa",
    backgroundDark: 'grey darken-3',
    icons: {
      mdiCheckboxMarkedCircleOutline,
      mdiCloseCircleOutline,
    }
  }

  const status = reactive({
    loading: true, 
    errorMessage: "",
  })

  const verifyMutation = useMutation("/user/register_active", {
    onMutate: () => {
      status.loading = true
      status.errorMessage = ""
    }, 
    onSuccess: () => {
      status.errorMessage = ""
    }, 
    onError: (error) => {
      if (isNetworkError(error.response)) {
        status.errorMessage = "网络连接失败"            
      } else {        
        status.errorMessage = error.response.data.msg
      }
    }, 
    onSettled: () => {
      status.loading = false
    }
  })

  const doVerify = () => {
    const query = route.query
    verifyMutation.mutate({
      id: query.id,
      code: query.code
    })
  }

  onMounted(() => {
    doVerify()
  })

  return { statics, status }
}