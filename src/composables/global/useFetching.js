import { useQuery } from "vue-query"
import axios from "axios"
import Config from 'Config'

export default (queryKeys, address, method = "get") => useQuery(queryKeys, async () => (
    await axios[method](Config.serverUrl + address).then((result) => result.data)
))