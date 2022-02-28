import { provide, reactive } from "@vue/composition-api"

export default () => {

  const testTeacherDetailIMS = {
    "id": 1,
    "name": "姚成建",
    "avatar": "https://ims.shanghaitech.edu.cn/_upload/article/images/8f/55/317ddd2643659b705930c656592f/f33bb0f6-768a-4b44-aadc-3caafb2347ff.jpg",
    "institute": "数学科学研究所",
    "job": "助理教授",
    "introduction": "研究兴趣：微分几何，几何分析，数学物理",
    "courses": [
      {
        "name": "数学分析I",
        "code": "GEMA1009",
        "id": 1,
        "credit": 5,
        "institute": "数学科学研究所", 
        "score": [5, 0.3, 4.5, 2.1]
      }, 
      {
        "name": "数学分析II",
        "code": "GEMA1010",
        "id": 2,
        "credit": 5,
        "institute": "数学科学研究所", 
        "score": [4.9, 4.5, 4.3, 4.1]
      }, 
    ]
  } // Just for test

  const testTeacherDetailSPST = {
    "id": 2,
    "name": "冯继成",
    "avatar": "https://spst.shanghaitech.edu.cn/_upload/article/images/bd/89/c17026aa484da3e9c95f489cd37c/4f8d4d21-a0ba-40f0-9408-8fb264a8916d.jpg",
    "institute": "物质科学与技术学院",
    "job": "助理教授、研究员",
    "introduction": "2010年-2012年,担任中石化立得公司技术主管；随后获欧盟项目全奖AIO，于2012年-2016年攻读荷兰代尔夫特理工大学博士学位；2016年-2018年，荷兰莱顿大学Koper院士组做博士后研究；2018年-2020年，被韩国首尔大学聘任为科研助理教授；2020年9月加入上海科技大学物质科学与技术学院，任助理教授、研究员、博士生导师",
    "courses": [
      {
        "name": "化工原理",
        "code": "CHEM1381",
        "id": 3,
        "credit": 3,
        "institute": "物质科学与技术学院", 
        "score": [4.1, 3.3, 2.5, 1.1]
      }, 
      {
        "name": "气溶胶科学与技术",
        "code": "CHEM2116",
        "id": 4,
        "credit": 2,
        "institute": "物质科学与技术学院", 
        "score": [2.2, 3.3, 4.4, 1.1]
      }, 
    ]
  } // Just for test

  const testTeacherDetailSLST = {
    "id": 3,
    "name": "仓勇",
    "avatar": "https://slst.shanghaitech.edu.cn/_upload/article/images/26/a6/986028264f9cb28a2e5cbf206dc4/84944c93-e1d0-47db-b982-bef2fc76d2f3_s.jpg",
    "institute": "生命科学与技术学院",
    "job": "教授、研究员、博士生导师",
    "introduction": "研究方向：癌症细胞生物学；靶向和免疫治疗",
    "courses": [
      {
        "name": "生活中的生命科学",
        "code": "SL1004",
        "id": 5,
        "credit": 2,
        "institute": "生命科学与技术学院", 
        "score": [0.1, 2.3, 2.5, 1.1]
      }, 
    ],
  } // Just for test

  const testTeacherDetailSIST = {
    "id": 4,
    "name": "梁俊睿",
    "avatar": "https://sist.shanghaitech.edu.cn/_upload/article/images/5e/01/4e13a709449b883318cb99f0c110/292a74f4-379b-4111-beb5-631da7956363_s.jpg",
    "institute": "信息科学与技术学院",
    "job": "副教授",
    "introduction": "Junrui Liang is currently the CiPES Director, the Resource Management Committee Director and the Deputy director of EHS Committee...", 
    "courses": [
      {
        "name": "信息科学技术导论",
        "code": "SI100B",
        "id": 6,
        "credit": 4,
        "institute": "信息科学与技术学院", 
        "score": [4.1, 2.3, 0.5, 1.1]
      }, 
      {
        "name": "可再生能源系统",
        "code": "EE272",
        "id": 7,
        "credit": 4,
        "institute": "信息科学与技术学院", 
        "score": [5, 3.3, 2.5, 1.1]
      }, 
      {
        "name": "信息科学技术导论",
        "code": "SI100B",
        "id": 8,
        "credit": 4,
        "institute": "信息科学与技术学院", 
        "score": [5, 4.5, 0.3, 0]
      }, 
      {
        "name": "可再生能源系统",
        "code": "EE272",
        "id": 9,
        "credit": 4,
        "institute": "信息科学与技术学院", 
        "score": [3.1, 1.3, 2.5, 1.1]
      }, 
      {
        "name": "中华文明通论", 
        "code": "GEHA123", 
        "id": 10, 
        "credit": 3, 
        "institute": "人文科学研究院",
        "score": [0.1, 0.3, 0.5, 0.2]
      }, 
      {
        "name": "数学分析I", 
        "code": "GEMA1009", 
        "id": 11, 
        "credit": 4, 
        "institute": "数学科学研究所", 
        "score": [1.1, 3.3, 2.5, 0.1]
      }, 
    ],
  } // Just for test

  const testCourseStatistic = {
    total: 6,
    score: 2956,
    count: {
      "信息科学与技术学院": 4, 
      "物质科学与技术学院": 0,
      "生命科学与技术学院": 0,
      "创意与艺术学院": 0, 
      "创业与管理学院": 0, 
      "人文科学研究院": 1, 
      "生物医学工程学院": 0, 
      "数学科学研究所": 1, 
      "其他学院": 1, 
    }
  } // Just for test


  const getCourseStatistic = () => {
    const courseStatistic = testCourseStatistic;

    return courseStatistic;
  }
  
  const getTeacherDetail = () => {
    const teacherDetail = testTeacherDetailSIST

    return teacherDetail
  }

  const teacherDetail = reactive(getTeacherDetail())

  const courseText = reactive(teacherDetail.courses)

  const courseStatistic = reactive(getCourseStatistic())

  const status = reactive({
    selected: (() => {
      let ret = new Array()
      for (let key in courseStatistic.count) {
        if (courseStatistic.count[key]) {
          ret.push(key)
        }
      } return ret
    })(), 
  })

  provide("courseStatistic", courseStatistic)

  provide("courseStatus", status)

  provide("courseText", courseText)

  provide("teacherDetail", teacherDetail)

  return { courseText, status }
  
}