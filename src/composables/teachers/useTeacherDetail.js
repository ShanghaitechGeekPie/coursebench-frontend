import { provide, reactive, ref, onMounted, inject } from 'vue';
import useFetching from '@/composables/global/useFetching';
import useWatching from '@/composables/global/useWatching';
import useRefCopy from '@/composables/global/useRefCopy';
import { useRouter, useRoute } from '@/router/migrateRouter';
import {
  isNetworkError,
  isValidErrorMessage,
} from '@/composables/global/useHttpError';
import { instituteInfo } from '@/composables/global/useStaticData';
import { mockDataManager } from '@/composables/global/usePhantomData';

export default () => {
  const router = useRouter();
  const route = useRoute();
  const showSnackbar = inject('showSnackbar');

  const teacherDetail = reactive({
    id: 0,
    name: '',
    avatar: '',
    institute: '',
    job: '',
    introduction: '',
    courses: [],
  });

  const courseText = ref([]);

  const courseStatistic = reactive({
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
  });

  const status = reactive({
    loading: true,
  });

  const courseFilterStatus = reactive({
    selected: [],
  });

  const getCourseStatistic = () => {
    courseStatistic.total = teacherDetail.courses.length;
    const schools = Object.getOwnPropertyNames(courseStatistic.count).filter(
      (key) => {
        return key != '__ob__' && key != '其他学院';
      },
    );
    for (let course of teacherDetail.courses) {
      if (schools.indexOf(course.institute) >= 0) {
        courseStatistic.count[course.institute]++;
      } else {
        courseStatistic.count['其他学院']++;
        course.institute = '其他学院';
      }
    }
  };

  const getTeacherDetail = () => {
    const id = route.params.id;

    // mock数据
    if (mockDataManager.isEnabled()) {
      const mockTeacherDetail = mockDataManager.getData('teacherDetail', parseInt(id));
      if (mockTeacherDetail) {
        useRefCopy(mockTeacherDetail.teacher, teacherDetail);
        teacherDetail.courses = mockTeacherDetail.courses;
        getCourseStatistic();
        courseText.value = teacherDetail.courses;
        courseFilterStatus.selected = (() => {
          let ret = new Array();
          for (let key in courseStatistic.count) {
            if (courseStatistic.count[key]) {
              ret.push(key);
            }
          }
          return ret;
        })();
        status.loading = false;
      } else {
        showSnackbar('error', '教师不存在', 3000);
        setTimeout(() => router.push('/'), 3000);
      }
      return;
    }


    const {
      status: fetchStatus,
      data,
      error,
    } = useFetching(['teacher_detail', id], '/teacher/' + id);
    useWatching(fetchStatus, () => {
      if (fetchStatus.value == 'success') {
        status.loading = false;
      } else if (fetchStatus.value == 'error') {
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
        useRefCopy(data.value.data, teacherDetail);
        getCourseStatistic();
        courseText.value = teacherDetail.courses;
        courseFilterStatus.selected = (() => {
          let ret = new Array();
          for (let key in courseStatistic.count) {
            if (courseStatistic.count[key]) {
              ret.push(key);
            }
          }
          return ret;
        })();
      }
    });
  };

  onMounted(() => {
    getTeacherDetail();
  });

  provide('courseStatistic', courseStatistic);
  provide('courseFilterStatus', courseFilterStatus);
  provide('teacherDetail', teacherDetail);

  return { courseText, status, courseFilterStatus, teacherDetail };
};
