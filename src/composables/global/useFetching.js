import { useQuery } from "vue-query"
import axios from "axios"
import Config from 'Config'

export default (key, address, returnFunction = (result) => result) => {
    return useQuery(key, async () => {
        const response = await axios.get(Config.serverUrl + address)
        return returnFunction(response.data)
    })
}