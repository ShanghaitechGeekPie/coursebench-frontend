import { reactive } from "@vue/composition-api"

export default () => {

  const formRules = reactive({
    required: (value) => {
      return value.length > 0 || '内容不能为空'
    },
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || '无效的邮箱格式'
    },
    username: (value) => {
      const pattern = /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,16}$/
      return pattern.test(value) || '用户名只能包含中文、字母、数字、下划线，且长度在3-16位'
    },
    password: (value) => {
      const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/
      return pattern.test(value) || '密码必须包含字母及数字，长度为8-16位'
    }
  })

  return { formRules }
}