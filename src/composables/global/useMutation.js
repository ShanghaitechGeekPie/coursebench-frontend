import { useMutation } from "vue-query"
import axios from "axios"
import Config from 'Config'

export default (address, options) => useMutation((mutationValue) => (
    axios.post(Config.serverUrl + address, mutationValue)
), options)