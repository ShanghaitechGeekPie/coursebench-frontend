import { reactive, provide } from "vue"

export default () => {

  const commentOrder = reactive({
    sortBy: "时间",
    reverse: "降序"
  })

  provide('commentOrder', commentOrder);

  return { commentOrder }
}
