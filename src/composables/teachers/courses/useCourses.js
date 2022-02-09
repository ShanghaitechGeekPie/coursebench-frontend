import { inject, provide, reactive } from "@vue/composition-api"

export default () => {

  const { courses: coursesDetail } = inject("teacherDetail")

  const coursesStatistic = {
    total: 5, 
  }

  const statics = {

  }

  const status = reactive({

  })

  provide("coursesStatistic", coursesStatistic)

  return { coursesDetail, statics, status }
}