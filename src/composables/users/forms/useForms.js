

export default () => {

  const formRules = {
    required: (value) => {
      return value.length > 0 || '该内容为必填项'
    },
    email: (value) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (pattern.test(value)) {
        if (value.indexOf("shanghaitech.edu.cn") !== -1) {
          return true
        } else {
          return "请输入上海科技大学邮箱"
        }
      } else {
        return "请输入正确的邮箱地址"
      }
    },
    username: (value) => {
      const pattern = /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,16}$/
      return pattern.test(value) || '用户名只能包含中文、字母、数字、下划线，且长度在3-16位'
    },
    password: (value) => {
      const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/
      return pattern.test(value) || '密码必须包含字母及数字，长度为8-16位'
    }
  }
  
  return { formRules }
}