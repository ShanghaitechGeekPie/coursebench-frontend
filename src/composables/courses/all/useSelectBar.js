import { inject } from "vue"


export default () => {

  const status = inject("courseStatus")


  const statics = {
    ...inject("sortStatics"),
  }

  
  return { statics, status }
}