import useMutation from "@/composables/global/useMutation"
import useDebounce from "@/composables/global/useDebounce"

export default (address, config) => {
    const captchaMutation = useMutation(address, config)
    return useDebounce(function() {
        captchaMutation.mutate(arguments)
    })
}