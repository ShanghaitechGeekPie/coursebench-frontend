import { inject, reactive } from "@vue/composition-api"

export default () => {

  const teacherDetail = inject("teacherDetail")

  const statics = {
    background: {
      "信息科学技术学院": '#b0c4de', 
      "物质科学技术学院": '#00a650',
      "生命科学技术学院": '#f39800',
      "创意与艺术学院": '#000000', 
      "创业与管理学院": '#7d3c92', 
      "人文科学研究院": '#a40050', 
      "生物医学工程学院": '#101f5b', 
      "数学科学研究院": '#2800ae', 
      "其他学院": '#757575'
    }, 
    logo: "https://www.shanghaitech.edu.cn/_upload/tpl/00/20/32/template32/images/logo_white.svg"
  }

  const status = reactive({

  })

  return { teacherDetail, statics, status }
}