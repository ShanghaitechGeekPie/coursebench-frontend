import { reactive } from "@vue/composition-api"
import {provide} from "@vue/composition-api/dist/vue-composition-api";

export default () => {

  const commentOrder = reactive({
    sortBy: "时间",
    reverse: "降序"
  })

  provide('commentOrder', commentOrder);

  return { commentOrder }
}
