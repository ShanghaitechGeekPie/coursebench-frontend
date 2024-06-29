export default () => {
  const formRules = {
    required: (value) => {
      return (value && value.length > 0) || '该内容为必填项';
    },
    email: (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (pattern.test(value)) {
        // Fixed: Invalid Shanghaitech email address match
        if (value.endsWith('@shanghaitech.edu.cn')) {
          return true;
        } else {
          return '请输入上海科技大学邮箱';
        }
      } else {
        return '请输入正确的邮箱地址';
      }
    },
    nickname: (value) => {
      const pattern = /^[\u4e00-\u9fff_a-zA-Z0-9]{3,16}$/;
      return (
        pattern.test(value) ||
        '用户名只能包含中文、字母、数字、下划线，且长度在3-16位'
      );
    },
    realname: (value) => {
      if (value.length === 0 || value == undefined) {
        return true;
      }
      const pattern = /^[\u4e00-\u9fff_a-zA-Z]{2,16}$/;
      return (
        pattern.test(value) || '真实姓名只能包含中文或英文，且长度在2-16位'
      );
    },
    password: (value) => {
      const pattern = /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/;
      return pattern.test(value) || '密码必须包含字母及数字，长度为8-16位';
    },
    invitation_code: (value) => {
      const pattern = /^[a-zA-Z0-9]{5}$/;
      return (
        !value ||
        value.length == 0 ||
        pattern.test(value) ||
        '邀请码为只含字母和数字的5位字符串'
      );
    },
    reward: (value) => {
      const pattern = /^([1-9]+[\d]*(.[0-9]{1,2})?)$/;
      return (
        !value || value.length == 0 || pattern.test(value) || '赏金为两位小数'
      );
    },
  };

  return { formRules };
};
