import useDebounce from "@/composables/global/useDebounce";
import useMutation from '@/composables/global/useMutation';
import { inject, ref } from "vue";
export default () => {
    const showSnackbar = inject("showSnackbar")
    const onEnterUp = () => {console.log("SHIT");
    console.log(formStatus.reward);}
    const formStatus = ref({
        id: 0,
        reward: "1145.14",
    })
    const rewardMutation = useMutation("/reward/set", {
        onMutate: () => {},
        onSuccess: (response) => {
            showSnackbar("success", "修改成功")
            // setTimeout(() => {
            //     window.location.reload()
            // }, 1000)
        },
        onError: (error) => {
            formStatus.loading = false
            formStatus.isPostError = true
            if (isNetworkError(error.response)) {
                showSnackbar("error", error.response.data.code)
            }
            else {
                showSnackbar("error", error.response.data)
            }
        }
    })
    const doModifyReward = useDebounce((()=>{
        rewardMutation.mutate({"id": formStatus.value.id, "reward": Math.floor(parseFloat(formStatus.value.reward) * 100)});
    }))
    return {doModifyReward, formStatus, onEnterUp};
}