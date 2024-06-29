const instituteInfo = {
  信息科学与技术学院: { name: 'SIST', color: '#b0c4de' },
  物质科学与技术学院: { name: 'SPST', color: '#00a650' },
  生命科学与技术学院: { name: 'SLST', color: '#f39800' },
  创意与艺术学院: { name: 'SCA', color: '#000000' },
  创业与管理学院: { name: 'SEM', color: '#7d3c92' },
  人文科学研究院: { name: 'GE', color: '#a40050' },
  生物医学工程学院: { name: 'BME', color: '#101f5b' },
  数学科学研究所: { name: 'IMS', color: '#2800ae' },
  其他学院: { name: 'Other', color: '#757575' },
  '': { name: 'None', color: '#B0B0B0' },
};

const scoreInfo = [
  { label: '数据不足', color: '#B0B0B0' }, // if comment num < 5, we use this
  { label: '特别差评', color: '#FF5252' },
  { label: '多半差评', color: '#FF892F' },
  { label: '褒贬不一', color: '#FFC107' },
  { label: '多半好评', color: '#A4BE23' },
  { label: '特别好评', color: '#709800' },
  { label: '好评如潮', color: '#1B5E20' },
  { label: '差评如潮', color: '#B71C1C' }, // otherwise, we use this
];

const gradingInfo = {
  quality: ['很差', '较差', '一般', '较好', '很好'],
  workload: ['>8h ', '4-8h', '2-4h', '1-2h', '<1h '],
  difficulty: ['很难', '较难', '适中', '偏易', '简单'],
  distribution: ['很差', '较差', '一般', '较好', '很好'],
  color: ['#FF5252', '#FF892F', '#FFC107', '#A4BE23', '#709800'],
};

const judgeItems = ['课程质量', '作业用时', '考核难度', '给分情况'];
const gradeItems = ['暂不透露', '本科生', '硕士研究生', '博士研究生'];
const visibleItems = ['匿名', '公开'];
const rawYearItems = (() => {
  const startYear = 2014;
  const nowYear = new Date().getFullYear();
  return new Array(nowYear - startYear + 1)
    .fill(0)
    .map((_, index) => startYear + index);
})().reverse();
const yearItems = rawYearItems.concat(['暂不透露']).reverse();

const termItems = [
  {
    id: '01',
    name: '秋学期',
  },
  {
    id: '02',
    name: '春学期',
  },
  {
    id: '03',
    name: '暑学期',
  },
];

const gradingEmojis = ['😭', '☹️', '🙁', '🙂', '😊'];

export {
  instituteInfo,
  scoreInfo,
  gradingInfo,
  judgeItems,
  gradeItems,
  visibleItems,
  yearItems,
  rawYearItems,
  termItems,
  gradingEmojis,
};
