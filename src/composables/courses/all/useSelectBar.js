import { inject } from "vue"


export default () => {

  const status = inject("courseStatus")


  const statics = {
    sortKeyItem: ['综合评分', '评价总数', "学分"],
    orderItem: {
      "综合评分": ["从高到低", "从低到高"],
      "评价总数": ["从多到少", "从少到多"], 
      "学分": ["从多到少", "从少到多"]
    },
  }

  
  return { statics, status }
}