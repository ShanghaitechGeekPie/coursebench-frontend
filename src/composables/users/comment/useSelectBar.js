import { inject,} from "vue"


export default () => {

  const status = inject("commentStatus")


  const statics = {
    sortKeyItem: ['发布时间', '修改时间'],
    orderItem: {
      "发布时间": ['从后往前', '从前往后'], 
      "修改时间": ['从后往前', '从前往后']
    },
  }
  
  
  return { statics, status }
}