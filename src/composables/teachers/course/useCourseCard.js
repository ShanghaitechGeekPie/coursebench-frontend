import {
  mdiChartBubble,  
  mdiDotsHorizontal, 
} from "@mdi/js";

export default () => {

  const statics = {
    background: {
      "信息科学与技术学院": '#b0c4de', 
      "物质科学与技术学院": '#00a650',
      "生命科学与技术学院": '#f39800',
      "创意与艺术学院": '#000000', 
      "创业与管理学院": '#7d3c92', 
      "人文科学研究院": '#a40050', 
      "生物医学工程学院": '#101f5b', 
      "数学科学研究所": '#2800ae', 
      "其他学院": '#757575'
    }, 
    short: {
      "信息科学与技术学院": 'SIST', 
      "物质科学与技术学院": 'SPST',
      "生命科学与技术学院": 'SLST',
      "创意与艺术学院": 'SCA', 
      "创业与管理学院": 'SEM', 
      "人文科学研究院": 'GE', 
      "生物医学工程学院": 'BME', 
      "数学科学研究所": 'IMS', 
      "其他学院": '?'
    }, 
    color: [
      "#B71C1C", 
      "#FF5252", 
      "#FF892F", 
      "#FFC107", 
      "#A4BE23", 
      "#709800", 
      "#1B5E20", 
    ], 
    label: [
      "特别差评", 
      "差评如潮", 
      "多半差评", 
      "褒贬不一", 
      "多半好评", 
      "好评如潮", 
      "特别好评", 
    ], 
    icons: {
      mdiChartBubble,  
      mdiDotsHorizontal, 
    }
  }

  return { statics }
}