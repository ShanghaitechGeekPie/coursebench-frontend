import { inject, reactive } from "vue"
import useWatching from "@/composables/global/useWatching"

export default () => {

  const background = {
    "信息科学与技术学院": '#b0c4de', 
    "物质科学与技术学院": '#00a650',
    "生命科学与技术学院": '#f39800',
    "创意与艺术学院": '#000000', 
    "创业与管理学院": '#7d3c92', 
    "人文科学研究院": '#a40050', 
    "生物医学工程学院": '#101f5b', 
    "数学科学研究所": '#2800ae', 
    "其他学院": '#757575', 
    "": "#B0B0B0"
  }

  const teacherDetail = inject("teacherDetail")

  const statics = reactive({
    backgroundLight: background[teacherDetail.institute], 
    backgroundDark: 'grey darken-3', 
  })

  useWatching(teacherDetail, () => {
    statics.backgroundLight = background[teacherDetail.institute]
  })

  return { statics }
}