import { provide, reactive, ref, onMounted, inject, computed } from 'vue';
import useFetching from '@/composables/global/useFetching';
import useWatching from '@/composables/global/useWatching';
import useRefCopy from '@/composables/global/useRefCopy';
import { useRouter, useRoute } from '@/router/migrateRouter';
import {
  isNetworkError,
  isValidErrorMessage,
} from '@/composables/global/useHttpError';

export default () => {
  const router = useRouter();
  const route = useRoute();
  const showSnackbar = inject('showSnackbar');

  const courseDetail = reactive({
    id: 0,
    name: '',
    code: '',
    credit: 0,
    institute: '',
    comment_num: 0,
    score: [0, 0, 0, 0],
    description: '',
    groups: []
  });

  const commentText = ref([]);
  const status = reactive({
    loading: true,
    commentLoading: true,
  });

  const getCourseDetail = () => {
    const id = route.params.id;
    
    const {
      status: fetchStatus,
      data,
      error,
    } = useFetching(['course_detail', id], '/course/' + id);
    
    useWatching(fetchStatus, () => {
      if (fetchStatus.value === 'success') {
        status.loading = false;
      } else if (fetchStatus.value === 'error') {
        if (isNetworkError(error.value.response)) {
          showSnackbar('error', '网络连接错误', 3000);
        } else if (isValidErrorMessage(error.value.response.data.msg)) {
          showSnackbar('error', error.value.response.data.msg, 3000);
        } else {
          showSnackbar('error', '服务器发生错误', 3000);
        }
        setTimeout(() => router.push('/'), 3000);
      }
    });
    
    useWatching(data, () => {
      if (data.value) {
        useRefCopy(data.value.data, courseDetail);
      }
    });
  };

  const getCourseComments = () => {
    const id = route.params.id;
    
    const {
      status: fetchStatus,
      data,
      error,
    } = useFetching(['course_comments', id], '/comment/course/' + id);
    
    useWatching(fetchStatus, () => {
      if (fetchStatus.value === 'success') {
        status.commentLoading = false;
      } else if (fetchStatus.value === 'error') {
        if (isNetworkError(error.value.response)) {
          showSnackbar('error', '网络连接错误', 3000);
        } else if (isValidErrorMessage(error.value.response.data.msg)) {
          showSnackbar('error', error.value.response.data.msg, 3000);
        } else {
          showSnackbar('error', '服务器发生错误', 3000);
        }
      }
    });
    
    useWatching(data, () => {
      if (data.value) {
        commentText.value = data.value.data || [];
      }
    });
  };

  onMounted(() => {
    getCourseDetail();
    getCourseComments();
  });

  provide('courseDetail', courseDetail);
  provide('courseCommentText', commentText);

  return { courseDetail, commentText, status };
};
