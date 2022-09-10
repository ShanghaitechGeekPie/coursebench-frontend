import { useRoute } from '@/router/migrateRouter'


export default () => {

    const route = useRoute()

    const isCurrentPath = (path) => !new RegExp(path).test(route.path)

    return { isCurrentPath }
}