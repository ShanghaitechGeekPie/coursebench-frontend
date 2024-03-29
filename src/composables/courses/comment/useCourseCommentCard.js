import { inject, reactive } from 'vue';
import useMutation from '@/composables/global/useMutation';
import useDebounce from '@/composables/global/useDebounce';
import { isNetworkError } from '@/composables/global/useHttpError';
import { mdiSchoolOutline } from '@mdi/js';

export default () => {
  const showSnackbar = inject('showSnackbar');

  const global = inject('global');

  const statics = {
    icons: {
      mdiSchoolOutline,
    },
  };

  const formStatus = reactive({
    likeStatus: 0,
    operationStatus: -1,
  });

  let errorMethod = (error) => {
    if (isNetworkError(error.response)) {
      showSnackbar('error', error.response.data.code);
    } else if (!global.userProfile.id) {
      showSnackbar('error', '您还没有登录');
    }
    formStatus.operationStatus = -1;
  };

  let successMethod = (response) => {
    formStatus.likeStatus = formStatus.operationStatus;
    // showSnackbar("success", "点赞成功")
  };

  const commentMutation = useMutation('/comment/like', {
    onMutate: () => {},
    onSuccess: successMethod,
    onError: errorMethod,
  });

  const doLike = useDebounce((id) => {
    formStatus.operationStatus = 1;
    commentMutation.mutate({
      id: id,
      status: 1,
    });
  });

  const doDislike = useDebounce((id) => {
    formStatus.operationStatus = 2;
    commentMutation.mutate({
      id: id,
      status: 2,
    });
  });

  const doUndo = useDebounce((id) => {
    formStatus.operationStatus = 0;
    commentMutation.mutate({
      id: id,
      status: 0,
    });
  });

  return { doLike, doDislike, doUndo, formStatus, statics };
};
