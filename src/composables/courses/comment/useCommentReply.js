import { inject, reactive, ref } from 'vue';
import useMutation from '@/composables/global/useMutation';
import useDebounce from '@/composables/global/useDebounce';
import { isNetworkError } from '@/composables/global/useHttpError';

export default () => {
  const showSnackbar = inject('showSnackbar');

  const replyStatus = reactive({
    loading: false,
    isSuccess: false,
    isError: false,
  });

  const likeStatus = reactive({
    loading: false,
    isSuccess: false,
    isError: false,
  });

  const replyMutation = useMutation('/comment/reply/post', {
    onMutate: () => {
      replyStatus.loading = true;
      replyStatus.isError = false;
    },
    onSuccess: (response) => {
      replyStatus.loading = false;
      replyStatus.isSuccess = true;
      showSnackbar('success', '回复发表成功');
    },
    onError: (error) => {
      replyStatus.loading = false;
      replyStatus.isError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', error.response.data.code);
      } else if (error.response.data.code === 'CommentNotExists') {
        showSnackbar('error', error.response.data.msg);
      } else if (error.response.data.code === 'PermissionDenied') {
        showSnackbar('error', error.response.data.msg);
      } else {
        showSnackbar('error', error.response.data.msg || '回复发表失败');
      }
    },
  });

  const replyLikeMutation = useMutation('/comment/reply/like', {
    onMutate: () => {
      likeStatus.loading = true;
      likeStatus.isError = false;
    },
    onSuccess: (response) => {
      likeStatus.loading = false;
      likeStatus.isSuccess = true;
    },
    onError: (error) => {
      likeStatus.loading = false;
      likeStatus.isError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', error.response.data.code);
      } else {
        showSnackbar('error', error.response.data.msg || '操作失败');
      }
    },
  });

  const replyUndoMutation = useMutation('/comment/reply/undo', {
    onMutate: () => {
      likeStatus.loading = true;
      likeStatus.isError = false;
    },
    onSuccess: (response) => {
      likeStatus.loading = false;
      likeStatus.isSuccess = true;
    },
    onError: (error) => {
      likeStatus.loading = false;
      likeStatus.isError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', error.response.data.code);
      } else {
        showSnackbar('error', error.response.data.msg || '操作失败');
      }
    },
  });

  const doSubmitReply = useDebounce((replyData) => {
    if (!replyData.content || replyData.content.trim() === '') {
      showSnackbar('error', '回复内容不能为空');
      return;
    }

    replyMutation.mutate({
      comment_id: replyData.comment_id,
      content: replyData.content.trim(),
      parent_reply_id: replyData.parent_reply_id || null,
    });
  });

  const doLikeReply = (replyId) => {
    replyLikeMutation.mutate({ reply_id: replyId });
  };

  const doUndoReply = (replyId) => {
    replyUndoMutation.mutate({ reply_id: replyId });
  };

  return {
    replyStatus,
    likeStatus,
    doSubmitReply,
    doLikeReply,
    doUndoReply,
  };
};
