import { inject,} from "vue"


export default () => {

  const status = inject("commentFilterStatus")


  const statics = {
    ...inject("sortStatics"),
  }
  
  
  return { statics, status }
}