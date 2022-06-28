import { reactive } from "@vue/composition-api"
import router from "@/router/index"

const currentRoute = reactive({ ...router.currentRoute })

const useRoute = () => currentRoute

const useRouter = () => router

router.afterEach((to, from, next) => {
  Object.keys(to).forEach((key) => {
    currentRoute[key] = to[key]
  })
})

export { useRoute, useRouter }
