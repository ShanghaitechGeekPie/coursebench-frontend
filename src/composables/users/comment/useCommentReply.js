import { ref, inject } from 'vue';
import useMutation from '@/composables/global/useMutation';
import { isNetworkError, isValidErrorMessage } from '@/composables/global/useHttpError';

export default () => {
  const showSnackbar = inject('showSnackbar');
  const global = inject('global');

  const replyStatus = ref({
    submitting: false,
    liking: false
  });

  const submitReplyMutation = useMutation('/comment/reply', {
    onMutate: () => {
      replyStatus.value.submitting = true;
    },
    onSuccess: (response) => {
      replyStatus.value.submitting = false;
      showSnackbar('success', '回复发表成功');
      return response.data;
    },
    onError: (error) => {
      replyStatus.value.submitting = false;
      if (isNetworkError(error.response)) {
        showSnackbar('error', '网络连接错误', 3000);
      } else if (isValidErrorMessage(error.response?.data?.msg)) {
        showSnackbar('error', error.response.data.msg, 3000);
      } else {
        showSnackbar('error', '发表回复失败', 3000);
      }
    }
  });

  const likeReplyMutation = useMutation('/comment/reply/like', {
    onMutate: () => {
      replyStatus.value.liking = true;
    },
    onSuccess: () => {
      replyStatus.value.liking = false;
    },
    onError: (error) => {
      replyStatus.value.liking = false;
      if (isNetworkError(error.response)) {
        showSnackbar('error', '网络连接错误', 3000);
      } else {
        showSnackbar('error', '操作失败', 3000);
      }
    }
  });

  const submitReply = async (replyData) => {
    if (!global.isLogin) {
      showSnackbar('error', '请先登录');
      return;
    }

    return await submitReplyMutation.mutate({
      comment_id: replyData.comment_id,
      content: replyData.content,
      parent_reply_id: replyData.parent_reply_id,
      is_anonymous: replyData.is_anonymous || false
    });
  };

  const likeReply = async (replyId, isLiked) => {
    if (!global.isLogin) {
      showSnackbar('error', '请先登录');
      return;
    }

    return await likeReplyMutation.mutate({
      reply_id: replyId,
      action: isLiked ? 'like' : 'unlike'
    });
  };

  return {
    replyStatus,
    submitReply,
    likeReply
  };
};
