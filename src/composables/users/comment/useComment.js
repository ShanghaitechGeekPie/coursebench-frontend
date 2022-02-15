import { inject, watchEffect } from "@vue/composition-api"

export default () => {

  const commentSort = (x, y) => {
    if (status.sortKey === "发布时间") {
      if (x.post_time === y.post_time) {
        return 0;
      } else {
        return status.order === "从后往前"
          ? new Date(x.post_time) < new Date(y.post_time)
            ? 1
            : -1
          : new Date(x.post_time) > new Date(y.post_time)
          ? 1
          : -1;
      }
    } else {
      if (x.update_time === y.update_time) {
        return 0;
      } else {
        return status.order === "从后往前"
          ? new Date(x.update_time) < new Date(y.update_time)
            ? 1
            : -1
          : new Date(x.update_time) > new Date(y.update_time)
          ? 1
          : -1;
      }
    }
  }

  const statics = {

  }

  const commentText = inject("commentText")
  
  const status = inject("commentStatus")

  watchEffect(() => {
    commentText.sort(commentSort)
  })



  return { commentText, statics, status }
}