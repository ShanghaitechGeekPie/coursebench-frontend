import { useQuery } from "vue-query"
import axios from "axios"
import Config from 'Config'

export default (queryKeys, address) => useQuery(queryKeys, async () => (
    await axios.get(Config.serverUrl + address).then((result) => result.data)
))