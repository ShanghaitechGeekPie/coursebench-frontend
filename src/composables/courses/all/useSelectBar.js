import { inject } from "vue"


export default () => {

  const status = inject("courseFilterStatus")


  const statics = {
    ...inject("sortStatics"),
  }

  
  return { statics, status }
}