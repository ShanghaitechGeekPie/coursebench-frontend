import { useQuery } from "vue-query"
import axios from "axios"
import Config from 'Config'

export default (key, address, success) => {
    const fetchFunction = () => axios.get(Config.serverUrl + address)
    return useQuery(key, fetchFunction, { onSuccess: success })
}