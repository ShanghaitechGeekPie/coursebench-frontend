import { inject,} from "vue"


export default () => {

  const status = inject("commentStatus")


  const statics = {
    ...inject("sortStatics"),
  }
  
  
  return { statics, status }
}