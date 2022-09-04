import { inject, watch } from "vue"

export default () => {

  const commentText = inject("courseText")
  const status = inject("courseStatus")


  const statics = {
    sortKeyItem: ['默认', '评价总数', "学分"],
    orderItem: ['默认', '从多到少', '从少到多'],
  }


  let lastStatus = Object.assign({}, status)
  const sortFunc = (x, y) => {

  }

  watch(status, () => {
    if ((lastStatus.sortKey != status.sortKey) || (lastStatus.order != status.order)) {
      commentText.value.sort(sortFunc)
      lastStatus = Object.assign({}, status)
    }
  })

  commentText.value.sort(sortFunc)

  
  return { statics, status }
}