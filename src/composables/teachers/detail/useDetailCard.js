import { inject, reactive } from "@vue/composition-api"

export default () => {

  const teacherDetail = inject("teacherDetail")

  const statics = {
    fullName: {
        SIST: '信息科学技术学院', 
        SPST: '物质科学技术学院',
        SLST: '生命科学技术学院',
        SCA: '创意与艺术学院', 
        SEM: '创业与管理学院', 
        GE: '人文科学研究院', 
        BME: '生物医学工程学院', 
        IMS: '数学科学研究院', 
        OTHER: '其他学院'
    }
  }

  const status = reactive({

  })

  return { teacherDetail, statics, status }
}