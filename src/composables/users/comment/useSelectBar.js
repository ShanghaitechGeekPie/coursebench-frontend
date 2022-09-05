import { inject, watch } from "vue"
import useDebounce from "@/composables/global/useDebounce"
import { sortByValue } from "@/composables/global/useSortFunc"

export default () => {

  const commentText = inject("commentText")
  const status = inject("commentStatus")


  const statics = {
    sortKeyItem: ['发布时间', '修改时间'],
    orderItem: {
      "发布时间": ['从后往前', '从前往后'], 
      "修改时间": ['从后往前', '从前往后']
    },
  }


  let lastStatus = Object.assign({}, status)
  const sortPolicy = {
    "发布时间": (x) => new Date(x.post_time), 
    "修改时间": (x) => new Date(x.update_time)
  }
  const sortFunc = (x, y) => sortByValue(
    sortPolicy[status.sortKey](x), sortPolicy[status.sortKey](y)
  )

  watch(status, useDebounce(() => {
    if (lastStatus.order != status.order) {
      commentText.value.reverse()
      lastStatus = Object.assign({}, status)
    } else if (lastStatus.sortKey != status.sortKey) {
      status.order = statics.orderItem[status.sortKey][0]
      commentText.value.sort(sortFunc)
      lastStatus = Object.assign({}, status)
    }
  }))

  commentText.value.sort(sortFunc)

  
  return { statics, status }
}