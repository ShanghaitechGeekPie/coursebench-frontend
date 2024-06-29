import {
  onMounted,
  provide,
  reactive,
  ref,
  inject,
  watch,
  computed,
} from 'vue';
import { instituteInfo, gradeItems } from '@/composables/global/useStaticData';
import useDebounce from '@/composables/global/useDebounce';
import useWatching from '@/composables/global/useWatching';
import useRefCopy from '@/composables/global/useRefCopy';
import useFetching from '@/composables/global/useFetching';
import useUserName from '@/composables/global/useUserName';
import { sortCmp } from '@/composables/global/useArrayUtils';
import { sortPolicy, sortStatics } from '@/composables/global/useCommentSort';
import { useRouter, useRoute } from '@/router/migrateRouter';
import {
  isNetworkError,
  isValidErrorMessage,
} from '@/composables/global/useHttpError';
import { setPreset, getPreset } from '@/composables/global/useCookie';

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

export default () => {
  const router = useRouter();
  const route = useRoute();
  const showSnackbar = inject('showSnackbar');
  const global = inject('global');

  const isSelf = ref(route.params.id == global.userProfile.id);

  const userProfile = reactive({
    email: '',
    year: 0,
    grade: '',
    nickname: '',
    realname: '',
    avatar: '',
    is_anonymous: true,
  });

  const commentRawText = ref([]);
  const commentText = computed(() =>
    commentRawText.value.filter(matchFilterComment),
  );

  const commentStatistic = computed(() => {
    if (commentRawText.value.length === 0) {
      return baseStatistic;
    }
    const res = { ...baseStatistic, count: { ...baseStatistic.count } };
    res.total = commentRawText.value.length;
    const schools = Object.keys(baseStatistic.count).filter(
      (key) => key !== '__ob__',
    );
    for (let comment of commentRawText.value) {
      if (schools.indexOf(comment.course.institute) >= 0) {
        res.count[comment.course.institute]++;
      } else {
        res.count['其他学院']++;
      }
      res.score += comment.like;
    }
    return res;
  });

  const status = reactive({
    profileLoading: true,
    commentLoading: true,
  });
  const commentFilterStatus = reactive({
    selected: [],
    sortKey: '发布时间',
    order: '从后往前',
  });

  const getUserProfile = () => {
    const id = route.params.id;
    const {
      status: fetchStatus,
      data,
      error,
    } = useFetching(['user_profile', id], '/user/profile/' + id);
    useWatching(fetchStatus, () => {
      if (fetchStatus.value === 'success') {
        status.profileLoading = false;
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
        useRefCopy(data.value.data, userProfile);
        if (isSelf.value) {
          // if we see our own profile, we should not be anonymous
          setPreset(data.value.data);
          global.userProfile = getPreset();
        }
        userProfile.nickname = useUserName(userProfile);
        userProfile.grade = gradeItems[userProfile.grade];
        userProfile.year =
          userProfile.year === 0 ? '暂不透露' : userProfile.year;
      }
    });
  };

  const getCommentText = () => {
    const id = route.params.id;
    const {
      status: fetchStatus,
      data,
      error,
    } = useFetching(['comment_text', id], '/comment/user/' + id);
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
        setTimeout(() => router.push('/'), 3000);
      }
    });
    useWatching(data, () => {
      if (data.value) {
        const schools = Object.keys(baseStatistic.count).filter(
          (key) => key !== '__ob__',
        );
        commentFilterStatus.selected = schools;
        if (data.value.data) {
          commentRawText.value = data.value.data
            .filter((comment) => !(comment.is_anonymous && !isSelf.value))
            .map((comment) => {
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
          commentRawText.value = [];
        }
        commentRawText.value.sort(commentSortFunc);
      }
    });
  };

  const matchFilterComment = (comment) => {
    return commentFilterStatus.selected.some(
      (school) => comment.course.institute == school,
    );
  };

  const commentSortFunc = (x, y) => {
    // by default, [0] is descending, [1] is ascending
    return (
      (commentFilterStatus.order ===
      sortStatics.orderItem[commentFilterStatus.sortKey][0]
        ? 1
        : -1) *
      sortCmp(
        sortPolicy[commentFilterStatus.sortKey](x),
        sortPolicy[commentFilterStatus.sortKey](y),
      )
    );
  };

  // A notice for future developers: The if statement justifying if to and from are equal is not necessary
  //  if you dont change the watch target in the watch function, otherwise you must use it to avoid infinite loop
  watch(
    () => commentFilterStatus.order,
    useDebounce(() => {
      commentRawText.value.sort(commentSortFunc);
    }),
  );

  watch(
    () => commentFilterStatus.sortKey,
    useDebounce(() => {
      if (
        commentFilterStatus.order ==
        sortStatics.orderItem[commentFilterStatus.sortKey][0]
      ) {
        commentRawText.value.sort(commentSortFunc);
      } else {
        commentFilterStatus.order =
          sortStatics.orderItem[commentFilterStatus.sortKey][0];
      }
    }),
  );

  provide('commentStatistic', commentStatistic);
  provide('commentFilterStatus', commentFilterStatus);
  provide('userProfile', userProfile);
  provide('isSelf', isSelf);

  if (isSelf) {
    watch(
      () => global.userProfile,
      () => {
        if (!global.isLogin) {
          isSelf.value = false;
        }
        useRefCopy(global.userProfile, userProfile);
        userProfile.nickname = useUserName(userProfile);
        userProfile.grade = gradeItems[userProfile.grade];
        userProfile.year =
          userProfile.year === 0 ? '暂不透露' : userProfile.year;
      },
    );
  }

  onMounted(() => {
    getUserProfile();
    getCommentText();
  });

  return { commentText, commentFilterStatus, status, userProfile };
};
