import { inject, reactive, ref, watch } from 'vue';
import { mdiChevronRight, mdiPencil } from '@mdi/js';
import {
  judgeItems,
  gradingInfo,
  rawYearItems,
  termItems,
} from '@/composables/global/useStaticData';
import useMutation from '@/composables/global/useMutation';
import useDebounce from '@/composables/global/useDebounce';
import { isNetworkError } from '@/composables/global/useHttpError';

export default () => {
  const showSnackbar = inject('showSnackbar');

  const teachers = inject('groups');

  const commentText = inject('courseCommentText');

  const global = inject('global');

  const courseYear = ref(0);
  const courseTerm = ref('');

  const statics = reactive({
    icons: {
      mdiChevronRight,
      mdiPencil,
    },
    grade: [
      gradingInfo.quality,
      gradingInfo.workload,
      gradingInfo.difficulty,
      gradingInfo.distribution,
    ],
    yearItems: rawYearItems,
    judgeItems: judgeItems,
    termItems: termItems,
  });

  const errorMsg = reactive({
    target: '',
    msg: '',
  });

  const writingMode = ref('create');

  const formStatus = reactive({
    id: null,
    loading: false,
    isPostSuccess: false,
    isPostError: false,
    title: '',
    content: '',
    semester: '',
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

  const commentMutation = useMutation('/comment/post', {
    onMutate: () => {
      formStatus.loading = true;
    },
    onSuccess: (response) => {
      formStatus.loading = false;
      formStatus.isPostSuccess = true;
      showSnackbar('success', '发表成功');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      formStatus.loading = false;
      formStatus.isPostError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', error.response.data.code);
      } else if (error.response.data.code === 'CommentAlreadyExists') {
        showSnackbar('error', error.response.data.msg);
      } else {
        showSnackbar('error', error.response.data);
      }
    },
  });

  const updateMutation = useMutation('/comment/update', {
    onMutate: () => {
      formStatus.loading = true;
    },
    onSuccess: (response) => {
      formStatus.loading = true;
      formStatus.isPostSuccess = true;
      showSnackbar('success', '修改成功');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    },
    onError: (error) => {
      formStatus.loading = false;
      formStatus.isPostError = true;
      if (isNetworkError(error.response)) {
        showSnackbar('error', error.response.data.code);
      } else if (error.response.data.code === 'CommentNotExists') {
        showSnackbar('error', error.response.data.msg);
      } else if (error.response.data.code === 'PermissionDenied') {
        showSnackbar('error', error.response.data.msg);
      } else {
        showSnackbar('error', error.response.data);
      }
    },
  });

  const doSubmit = useDebounce(() => {
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
    if (writingMode.value == 'create') {
      commentMutation.mutate({
        group: formStatus.commentTarget,
        title: formStatus.title, // 1～200字节
        content: formStatus.content, // 可以是markdown文本(暂定) 1～20000 字节
        semester: parseInt(formStatus.semester), //学期，暂定格式为 4位年份+ 01:秋学期,02：春学期，03：暑学期
        is_anonymous: formStatus.is_anonymous,
        scores: formStatus.slider, // 评分，每项的值只能为1,2,3,4,5中的一个
        student_score_ranking: 2, // * Not support yet
      });
    } else {
      updateMutation.mutate({
        id: formStatus.id,
        title: formStatus.title, // 1～200字节
        content: formStatus.content, // 可以是markdown文本(暂定) 1～20000 字节
        is_anonymous: formStatus.is_anonymous,
        scores: formStatus.slider, // 评分，每项的值只能为1,2,3,4,5中的一个
        semester: parseInt(formStatus.semester),
        user_score_ranking: 2, // * Not support yet
      });
    }
  });

  watch(
    commentText,
    () => {
      commentText.value.forEach((item) => {
        if (item.user) {
          if (item.user.id === global.userProfile.id) {
            writingMode.value = 'edit';
            formStatus.title = item.title;
            formStatus.content = item.content;
            formStatus.semester = item.semester;
            courseYear.value = parseInt(item.semester / 100);
            courseTerm.value = item.semester.toString().slice(4, 6);
            formStatus.is_anonymous = item.is_anonymous;
            formStatus.slider = item.score;
            formStatus.commentTarget = item.group.id;
            formStatus.id = item.id;
          }
        }
      });
    },
    {
      deep: true,
    },
  );

  return {
    statics,
    teachers,
    gradingInfo,
    doSubmit,
    formStatus,
    errorMsg,
    commentText,
    writingMode,
    courseTerm,
    courseYear,
  };
};
