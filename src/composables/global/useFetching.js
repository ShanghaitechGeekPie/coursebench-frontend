import { useQuery } from "vue-query"
import axios from "axios"
import Config from 'Config'

export default (queryKey, address) => useQuery(queryKey, () => (
    axios.get(Config.serverUrl + address).then((result) => result.data)
))