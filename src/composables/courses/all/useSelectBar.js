import { inject, watch } from "vue"
import useDebounce from "@/composables/global/useDebounce"
import { sortByValue } from "@/composables/global/useSortFunc"

export default () => {

  const courseText = inject("courseText")
  const status = inject("courseStatus")


  const statics = {
    sortKeyItem: ['综合评分', '评价总数', "学分"],
    orderItem: {
      "综合评分": ["从高到低", "从低到高"],
      "评价总数": ["从多到少", "从少到多"], 
      "学分": ["从多到少", "从少到多"]
    },
  }

  let lastStatus = Object.assign({}, status)
  const sortPolicy = {
    "综合评分": (x) => x.score.reduce((a, b) => a + b, 0) / x.score.length,
    "评价总数": (x) => x.comments_num, 
    "学分": (x) => x.credit
  }
  const sortFunc = (x, y) => sortByValue(
    sortPolicy[status.sortKey](x), sortPolicy[status.sortKey](y)
  )

  watch(status, useDebounce((to, from) => {
    if (lastStatus.order != status.order) {
      courseText.value.reverse()
      lastStatus = Object.assign({}, status)
    } else if (lastStatus.sortKey != status.sortKey) {
      status.order = statics.orderItem[status.sortKey][0]
      courseText.value.sort(sortFunc)
      lastStatus = Object.assign({}, status)
    }
  }))


  watch(courseText, (to, from) => {
    if (!from.value) {
      courseText.value.sort(sortFunc)
    }
    console.log(JSON.stringify(from.value), JSON.stringify(to))
  }, { deep: true })


  
  return { statics, status }
}