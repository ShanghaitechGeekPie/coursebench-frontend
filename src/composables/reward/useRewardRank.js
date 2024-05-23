import { provide, reactive, ref, onMounted, inject } from 'vue';
import useWatching from '@/composables/global/useWatching';
import useFetching from '@/composables/global/useFetching';
import { sortCmp } from '@/composables/global/useArrayUtils';
import {
  isNetworkError,
  isValidErrorMessage,
} from '@/composables/global/useHttpError';

const headers = [
  {
    text: '用户名',
    align: 'center',
    value: 'nick_name',
  },
  { text: '赏金', align: 'center', value: 'reward' },
];
export default () => {
  const showSnackbar = inject('showSnackbar');

  const rankList = ref([
  ]);

  const status = reactive({
    loading: true,
  });

  const getRewardRank = () => {
    const {
      status: fetchStatus,
      data,
      error,
    } = useFetching(['reward_rank'], '/reward/ranklist');
    useWatching(fetchStatus, () => {
      if (fetchStatus.value === 'success') {
        status.loading = false;
      } else if (fetchStatus.value == 'error') {
        status.loading = false;
        if (isNetworkError(error.value.response)) {
          showSnackbar('error', '网络连接错误');
        } else if (isValidErrorMessage(error.value.response.data.msg)) {
          showSnackbar('error', error.value.response.data.msg);
        } else {
          showSnackbar('error', '服务器发生错误');
        }
      }
    });
    useWatching(data, () => {
      if (data.value) {
        rankList.value = data.value.data.map((item) => {
          if (!item.is_anonymous) {
            return item;
          } else {
            return { ...item, nick_name: '匿名用户' };
          }
        });
        rankList.value.sort(sortFunc);
      }
    });
  };

  const sortFunc = (x, y) => {
    return sortCmp(x.reward, y.reward);
  };

  onMounted(() => {
    rankList.value.sort(sortFunc);
    getRewardRank();
  });

  // provide("ranklist", rankList)

  return { status, rankList, headers };
};
