import { onMounted, ref, reactive, inject } from 'vue';
import { defaultStatus } from '@/composables/global/useCommentSort';
import useFetching from '@/composables/global/useFetching';
import useWatching from '@/composables/global/useWatching';
import { useRouter } from '@/router/migrateRouter';
import { isNetworkError } from '@/composables/global/useHttpError';
import { instituteInfo } from '@/composables/global/useStaticData';
import { mockDataManager } from '@/composables/global/usePhantomData';

export default () => {
  const router = useRouter();
  const showSnackbar = inject('showSnackbar');
  const global = inject('global');

  const status = reactive({
    ...defaultStatus,
    commentLoading: false,
  });

  const commentText = ref([]);

  const baseStatistic = {
    total: 0,
    score: 0,
    count: (() => {
      let ret = {};
      Object.keys(instituteInfo)
        .filter((key) => key !== '')
        .forEach((key) => {
          ret[key] = 0;
        });
      return ret;
    })(),
  };

  const getCommentRecent = () => {
    // mock数据
    if (mockDataManager.isEnabled()) {
      const schools = Object.keys(baseStatistic.count).filter(
        (key) => key !== '__ob__',
      );

      commentText.value = mockDataManager.getData('comments').map((comment) => {
        if (schools.indexOf(comment.course.institute) >= 0) {
          return comment;
        } else {
          return {
            ...comment,
            course: { ...comment.course, institute: '其他学院' },
          };
        }
      });
      status.commentLoading = false;
      return;
    }


    status.commentLoading = true;
    const {
      status: fetchStatus,
      data,
      error,
    } = useFetching(['comment_recent'], '/comment/recent');
    useWatching(fetchStatus, () => {
      // console.log("Data Fetched!")
      if (fetchStatus.value === 'success') {
        status.commentLoading = false;
      } else if (fetchStatus.value === 'error') {
        const response = error.value.response;
        showSnackbar(
          'error',
          isNetworkError(response) ? '网络连接失败' : response.data.msg,
          3000,
        );
        setTimeout(() => router.push('/'), 3000);
      }
    });
    useWatching(data, () => {
      // console.log("Data Assigned!")
      if (data.value) {
        const schools = Object.keys(baseStatistic.count).filter(
          (key) => key !== '__ob__',
        );
        if (data.value.data) {
          commentText.value = data.value.data.map((comment) => {
            if (schools.indexOf(comment.course.institute) >= 0) {
              return comment;
            } else {
              return {
                ...comment,
                course: { ...comment.course, institute: '其他学院' },
              };
            }
          });
        } else {
          commentText.value = [];
        }
      }
    });
  };

  onMounted(() => {
    getCommentRecent();
  });

  return { commentText, status, global };
};
