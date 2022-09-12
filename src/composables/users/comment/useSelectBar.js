import { inject,} from "vue"

import {sortStatics} from "@/composables/global/useCommentSort";

export default () => {

  const status = inject("commentFilterStatus")


  const statics = {
    ...sortStatics,
  }
  
  
  return { statics, status }
}