import {
  mdiCheckboxMarkedCircleOutline,
  mdiCloseCircleOutline,
  mdiKeyVariant,
  mdiEye,
  mdiEyeOff,
} from '@mdi/js';
import { useRoute } from '@/router/migrateRouter';
import { reactive, onMounted } from 'vue';
import {
  isNetworkError,
  isValidErrorMessage,
} from '@/composables/global/useHttpError';
import useMutation from '@/composables/global/useMutation';

export default () => {
  const route = useRoute();

  const statics = {
    backgroundLight: '#aaaaaa',
    backgroundDark: 'grey darken-3',
    icons: {
      mdiCheckboxMarkedCircleOutline,
      mdiCloseCircleOutline,
      mdiKeyVariant,
      mdiEye,
      mdiEyeOff,
    },
  };

  const status = reactive({
    loading: false,
    errorMessage: '',
    passwordFormValid: false,
    passwordVisible: false,
    inputFinished: false,
  });

  const userData = reactive({
    password: '',
  });

  const resetPasswordActiveMutation = useMutation(
    '/user/reset_password_active',
    {
      onMutate: () => {
        status.loading = true;
        status.errorMessage = '';
      },
      onSuccess: () => {
        status.errorMessage = '';
      },
      onError: (error) => {
        if (isNetworkError(error.response)) {
          status.errorMessage = '网络连接失败，请稍后重试。';
        } else if (isValidErrorMessage(error.response.data.msg)) {
          status.errorMessage = error.response.data.msg + '，请稍后重试。';
        } else {
          status.errorMessage = '服务器发生错误，请稍后重试。';
        }
      },
      onSettled: () => {
        status.loading = false;
      },
    },
  );

  const doResetPasswordActive = () => {
    if (status.passwordFormValid && userData.password !== '') {
      status.inputFinished = true;
      resetPasswordActiveMutation.mutate({
        id: new Number(route.query.id),
        code: route.query.code,
        password: userData.password,
      });
    }
  };

  onMounted(() => {
    if (!route.query.id || !route.query.code) {
      status.loading = false;
      status.inputFinished = true;
      status.errorMessage = '激活链接无效，请检查链接是否正确。';
    }
  });

  return { statics, status, userData, doResetPasswordActive };
};
