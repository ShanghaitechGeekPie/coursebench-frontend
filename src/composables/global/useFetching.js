import { useQuery } from "vue-query"
import axios from "axios"
import Config from 'Config'

export default (queryKey, address) => useQuery(queryKey, async () => (
    await axios.get(Config.serverUrl + address).then((result) => result.data)
))