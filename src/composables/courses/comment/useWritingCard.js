import {
  mdiPencil,
  mdiSchoolOutline,
  mdiArrowLeft,
  mdiWindowClose,
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
  const teacherGroup = inject('groups');
  const commentText = inject('courseCommentText');
  const global = inject('global');

  const courseYear = ref(0);
  const courseTerm = ref('');
  const courseName = ref('');
  const userComments = ref([]);
  const writingMode = computed(() =>
    userComments.value.length > 0 ? 'edit' : 'create',
  );
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
    editLoading: false,
    deleteLoading: false,
    isPostSuccess: false,
    isPostError: false,
    title: '',
    content: '',
    semester: computed(getSemesterCode),
    is_anonymous: false,
    slider: [5, 5, 5, 5],
    commentTarget: 0,
  });

  const clearErrorMsg = () => {
    errorMsg.target = '';
    errorMsg.msg = '';
    formStatus.isPostError = false;
  };

  const pushErrorMsg = (target, msg) => {
    errorMsg.target = target;
    errorMsg.msg = msg;
  };

  const setEditTarget = (comment) => {
    // console.log(comment, formStatus);
    formStatus.id = comment.id;
    formStatus.title = comment.title;
    formStatus.content = comment.content;
    formStatus.is_anonymous = comment.is_anonymous;
    formStatus.slider = comment.score;
    courseYear.value = parseInt(comment.semester / 100);
    courseTerm.value = comment.semester.toString().slice(4, 6);
    formStatus.commentTarget = comment.group.id;
  };

  const clearEditTarget = () => {
    formStatus.id = null;
    formStatus.title = '';
    formStatus.content = '';
    courseTerm.value = '';
    courseYear.value = 0;
    formStatus.is_anonymous = false;
    formStatus.slider = [5, 5, 5, 5];
    formStatus.commentTarget = 0;
  };

  const createCommentMutation = useMutation('/comment/post', {
    onMutate: () => {
      formStatus.editLoading = true;
    },
    onSuccess: () => {
      formStatus.editLoading = false;
      formStatus.isPostSuccess = true;
      showSnackbar('success', '发表评论成功');
      // TODO: Add this new comment to the comment list
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      formStatus.editLoading = false;
      formStatus.isPostError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', '网络连接错误', 3000);
      } else if (error.response.data.code === 'CommentAlreadyExists') {
        showSnackbar('error', error.response.data.msg);
      } else if (isValidErrorMessage(error.value.response.data.msg)) {
        showSnackbar('error', error.value.response.data.msg, 3000);
      } else {
        showSnackbar('error', '服务器发生错误', 3000);
      }
    },
  });

  const editCommentMutation = useMutation('/comment/update', {
    onMutate: () => {
      formStatus.editLoading = true;
    },
    onSuccess: () => {
      formStatus.editLoading = false;
      formStatus.isPostSuccess = true;
      showSnackbar('success', '修改评论成功');
      clearEditTarget();
      windowStatus.windowStep = 0;
      // TODO: Add this updated comment to the comment list
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      formStatus.editLoading = false;
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

  const doSubmitComment = () => {
    clearErrorMsg();
    if (formStatus.semester === '' || isNaN(parseInt(formStatus.semester))) {
      pushErrorMsg('semester', '');
      return;
    }
    if (formStatus.title === '') {
      pushErrorMsg('title', '标题不能为空');
      return;
    }
    if (formStatus.content === '') {
      pushErrorMsg('content', '评论内容不能为空');
      return;
    }
    if (formStatus.commentTarget === 0) {
      pushErrorMsg('commentTarget', '评论对象不能为空');
      return;
    }

    if (writingMode.value === 'create' || formStatus.id === null) {
      createCommentMutation.mutate({
        group: formStatus.commentTarget,
        title: formStatus.title, // 1～200字节
        content: formStatus.content, // 可以是markdown文本(暂定) 1～20000 字节
        semester: parseInt(formStatus.semester), //学期，暂定格式为 4位年份+ 01:秋学期,02：春学期，03：暑学期
        is_anonymous: formStatus.is_anonymous,
        scores: formStatus.slider, // 评分，每项的值只能为1,2,3,4,5中的一个
        student_score_ranking: 2, // * Not support yet
      });
    } else {
      editCommentMutation.mutate({
        id: formStatus.id,
        title: formStatus.title, // 1～200字节
        content: formStatus.content, // 可以是markdown文本(暂定) 1～20000 字节
        is_anonymous: formStatus.is_anonymous,
        scores: formStatus.slider, // 评分，每项的值只能为1,2,3,4,5中的一个
        semester: parseInt(formStatus.semester),
        student_score_ranking: 2, // * Not support yet
      });
    }
  };

  const doDeleteComment = () => {
    deleteCommentMutation.mutate({
      id: formStatus.id,
    });
  };

  watch(
    commentText,
    () => {
      if (commentText.value.length > 0) {
        courseName.value = commentText.value[0].course.name;
      }
      userComments.value = commentText.value
        .filter((comment) => {
          return comment.user && comment.user.id == global.userProfile.id;
        })
        .map((comment) => {
          return JSON.parse(JSON.stringify(comment));
        });
      if (userComments.value.length > 0) {
        windowStatus.windowStep = 0;
      } else {
        windowStatus.windowStep = 1;
      }
    },
    {
      deep: true,
    },
  );

  return {
    statics,
    teacherGroup,
    errorMsg,
    formStatus,
    windowStatus,
    courseYear,
    courseTerm,
    writingMode,
    userComments,
    courseName,
    doSubmitComment,
    doDeleteComment,
    setEditTarget,
    clearEditTarget,
  };
};
