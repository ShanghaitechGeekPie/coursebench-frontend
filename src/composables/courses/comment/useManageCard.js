import {
  mdiPencil,
  mdiSchoolOutline,
  mdiArrowLeft,
  mdiWindowClose,
  mdiFormatPaint,
} from '@mdi/js';
import { gradingInfo } from '@/composables/global/useStaticData';
import { computed, reactive, watch, ref, inject } from 'vue';
import useMutation from '@/composables/global/useMutation';
import {
  isNetworkError,
  isValidErrorMessage,
} from '@/composables/global/useHttpError';

function getSemesterCode() {
  if (this.courseYear === 0) {
    return '';
  }
  if (this.courseTerm === '') {
    return '';
  }
  return this.courseYear + this.courseTerm;
}

export default () => {
  const showSnackbar = inject('showSnackbar');
  const commentText = inject('courseCommentText');
  const global = inject('global');

  const courseYear = ref(0);
  const courseTerm = ref('');
  const courseName = ref('');
  const userComments = ref([]);
  const windowStatus = reactive({
    windowStep: 1,
    previewMarkdown: false,
    showDialog: false,
  });

  const statics = {
    icons: {
      mdiPencil,
      mdiSchoolOutline,
      mdiArrowLeft,
      mdiWindowClose,
      mdiFormatPaint,
    },
    grade: [
      gradingInfo.quality,
      gradingInfo.workload,
      gradingInfo.difficulty,
      gradingInfo.distribution,
    ],
  };

  const errorMsg = reactive({
    target: '',
    msg: '',
  });

  const formStatus = reactive({
    id: null,
    deleteLoading: false,
    hideLoading: false,
    coverLoading: false,
    regenerateLoading: false,
    isPostSuccess: false,
    isPostError: false,
    title: '',
    content: '',
    semester: computed(getSemesterCode),
    is_anonymous: false,
    is_fold: false,
    is_covered: false,
    userProfile: {},
    slider: [5, 5, 5, 5],
    commentTarget: 0,
  });

  const setEditTarget = (comment) => {
    // console.log(comment, formStatus);
    courseName.value = comment.course.name;
    formStatus.id = comment.id;
    formStatus.title = comment.title;
    formStatus.content = comment.content;
    formStatus.is_anonymous = comment.is_anonymous;
    formStatus.is_fold = comment.is_fold;
    formStatus.is_covered = comment.is_covered;
    formStatus.slider = comment.score;
    courseYear.value = parseInt(comment.semester / 100);
    courseTerm.value = comment.semester.toString().slice(4, 6);
    formStatus.commentTarget = comment.group.id;
    formStatus.userProfile = comment.user;
  };

  const clearEditTarget = () => {
    formStatus.id = null;
    formStatus.title = '';
    formStatus.content = '';
    courseTerm.value = '';
    courseYear.value = 0;
    formStatus.is_anonymous = false;
    formStatus.is_fold = false;
    formStatus.is_covered = false;
    formStatus.slider = [5, 5, 5, 5];
    formStatus.commentTarget = 0;
    formStatus.userProfile = {};
  };

  const deleteCommentMutation = useMutation('/comment/delete', {
    onMutate: () => {
      formStatus.deleteLoading = true;
    },
    onSuccess: () => {
      formStatus.deleteLoading = false;
      formStatus.isPostSuccess = true;
      showSnackbar('success', '删除评论成功');
      clearEditTarget();
      windowStatus.windowStep = 0;
      // TODO: Add this updated comment to the comment list
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      formStatus.deleteLoading = false;
      formStatus.isPostError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', '网络连接错误', 3000);
      } else if (error.response.data.code === 'CommentNotExists') {
        showSnackbar('error', error.response.data.msg, 3000);
      } else if (error.response.data.code === 'PermissionDenied') {
        showSnackbar('error', error.response.data.msg, 3000);
      } else if (isValidErrorMessage(error.value.response.data.msg)) {
        showSnackbar('error', error.value.response.data.msg, 3000);
      } else {
        showSnackbar('error', '服务器发生错误', 3000);
      }
    },
  });

  const hideCommentMutation = useMutation('/comment/fold', {
    onMutate: () => {
      formStatus.hideLoading = true;
    },
    onSuccess: () => {
      formStatus.hideLoading = false;
      formStatus.isPostSuccess = true;
      if (!formStatus.is_fold) {
        showSnackbar('success', '隐藏评论成功');
      } else {
        showSnackbar('success', '取消隐藏成功');
      }
      clearEditTarget();
      windowStatus.windowStep = 0;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      formStatus.hideLoading = false;
      formStatus.isPostError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', '网络连接错误', 3000);
      } else if (error.response.data.code === 'CommentNotExists') {
        showSnackbar('error', error.response.data.msg, 3000);
      } else if (error.response.data.code === 'PermissionDenied') {
        showSnackbar('error', error.response.data.msg, 3000);
      } else if (isValidErrorMessage(error.value.response.data.msg)) {
        showSnackbar('error', error.value.response.data.msg, 3000);
      } else {
        showSnackbar('error', '服务器发生错误', 3000);
      }
    },
  });

  const coverCommentMutation = useMutation('/comment/cover', {
    onMutate: () => {},
    onSuccess: () => {
      formStatus.coverLoading = false;
      formStatus.regenerateLoading = false;
      formStatus.isPostSuccess = true;
      if (!formStatus.is_covered) {
        showSnackbar('success', '遮盖评论成功');
      } else {
        showSnackbar('success', '取消遮盖成功');
      }
      clearEditTarget();
      windowStatus.windowStep = 0;
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      formStatus.coverLoading = false;
      formStatus.regenerateLoading = false;
      formStatus.isPostError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', '网络连接错误', 3000);
      } else if (error.response.data.code === 'CommentNotExists') {
        showSnackbar('error', error.response.data.msg, 3000);
      } else if (error.response.data.code === 'PermissionDenied') {
        showSnackbar('error', error.response.data.msg, 3000);
      } else if (isValidErrorMessage(error.value.response.data.msg)) {
        showSnackbar('error', error.value.response.data.msg, 3000);
      } else {
        showSnackbar('error', '服务器发生错误', 3000);
      }
    },
  });

  const doDeleteComment = () => {
    deleteCommentMutation.mutate({
      id: formStatus.id,
    });
  };

  const doHideComment = () => {
    hideCommentMutation.mutate({
      id: formStatus.id,
      status: !formStatus.is_fold,
    });
  };

  const doCoverComment = () => {
    formStatus.coverLoading = true;
    coverCommentMutation.mutate({
      id: formStatus.id,
      status: !formStatus.is_covered,
    });
  };

  const doRegenerateCover = () => {
    formStatus.regenerateLoading = true;
    coverCommentMutation.mutate({
      id: formStatus.id,
      status: formStatus.is_covered,
    });
  };

  watch(
    commentText,
    () => {
      if (
        global.userProfile.is_admin ||
        global.userProfile.is_community_admin
      ) {
        userComments.value = commentText.value.map((comment) =>
          JSON.parse(JSON.stringify(comment)),
        );
      } else {
        userComments.value = commentText.value
          .filter((comment) => {
            return comment.user && comment.user.id == global.userProfile.id;
          })
          .map((comment) => {
            return JSON.parse(JSON.stringify(comment));
          });
      }
      if (userComments.value.length > 0) {
        windowStatus.windowStep = 0;
      } else {
        windowStatus.windowStep = 1;
        formStatus.userProfile = global.userProfile;
      }
    },
    {
      deep: true,
    },
  );

  return {
    statics,
    errorMsg,
    formStatus,
    windowStatus,
    courseYear,
    courseTerm,
    userComments,
    courseName,
    doDeleteComment,
    doHideComment,
    doCoverComment,
    doRegenerateCover,
    setEditTarget,
    clearEditTarget,
  };
};
