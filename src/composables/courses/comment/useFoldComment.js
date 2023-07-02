import { inject, reactive } from 'vue';
import useMutation from '@/composables/global/useMutation';
import useDebounce from '@/composables/global/useDebounce';
import { isNetworkError } from '@/composables/global/useHttpError';

export default () => {
  const showSnackbar = inject('showSnackbar');

  const global = inject("global");

  const commentFoldStatus = reactive({
    foldStatus: false,
    operationStatus: -1
  })

  let errorMethod = (error) => {
    if (isNetworkError(error.response)) {
      showSnackbar('error', error.response.data.code);
    } else if (!global.userProfile.id) {
      showSnackbar('error', '您还没有登录');
    } else if (!global.userProfile.is_admin) {
      showSnackbar('error', '您没有权限执行此操作');
    }
    commentFoldStatus.operationStatus = -1
  };

  let successMethod = (response) => {
    commentFoldStatus.foldStatus = (commentFoldStatus.operationStatus === 1);
    showSnackbar("success", "折叠成功")
  };

  const commentMutation = useMutation('/comment/fold', {
    onMutate: () => {},
    onSuccess: successMethod,
    onError: errorMethod,
  });

  const doFold = useDebounce((id) => {
    commentFoldStatus.operationStatus = 1;
    commentMutation.mutate({
      id: id,
      status: true,
    });
  });

  const doUnfold = useDebounce((id) => {
    commentFoldStatus.operationStatus = 0;
    commentMutation.mutate({
      id: id,
      status: false,
    });
  });

  return { doFold, doUnfold, commentFoldStatus };
}
