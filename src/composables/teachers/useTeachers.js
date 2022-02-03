import { provide, reactive } from "@vue/composition-api"

export default () => {

  const testTeacherDetail = {
    name: "姚成建",
    avatar: "https://ims.shanghaitech.edu.cn/_upload/article/images/8f/55/317ddd2643659b705930c656592f/f33bb0f6-768a-4b44-aadc-3caafb2347ff.jpg",
    school: "IMS", 
  } // Just for test

    
  const getTeacherDetail = () => {
    const teacherDetail = testTeacherDetail

    return teacherDetail
  }

  const teacherDetail = reactive(getTeacherDetail())

  provide("teacherDetail", teacherDetail)
  
}