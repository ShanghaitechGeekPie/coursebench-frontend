import { clearPreset } from '@/composables/global/useCookie';
import { inject } from 'vue';
import useMutation from '@/composables/global/useMutation';

export default () => {
  const showSnackbar = inject('showSnackbar');
  const global = inject('global');

  const logoutMutation = useMutation('/user/logout', {
    onMutate: () => {
      clearPreset();
      global.isLogin = false;
      global.userProfile = {};
      showSnackbar('success', '登出成功');
    },
  });

  const doLogout = () => {
    logoutMutation.mutate({});
  };

  return { doLogout };
};
