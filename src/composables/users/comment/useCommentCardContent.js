import {
  mdiAccountOutline,
  mdiClockOutline,
  mdiSchoolOutline,
  mdiSubtitlesOutline,
  mdiTriangle,
  mdiTriangleSmallDown,
  mdiTriangleSmallUp,
  mdiShare,
  mdiGold,
  mdiCommentOutline,
  mdiChevronRight,
} from '@mdi/js';
import { gradingInfo } from '@/composables/global/useStaticData';
import { inject } from 'vue';
export default () => {
  const global = inject('global');
  const statics = {
    icons: {
      mdiAccountOutline,
      mdiClockOutline,
      mdiSchoolOutline,
      mdiSubtitlesOutline,
      mdiTriangle,
      mdiTriangleSmallDown,
      mdiTriangleSmallUp,
      mdiShare,
      mdiGold,
      mdiCommentOutline,
      mdiChevronRight,
    },
    grade: [
      gradingInfo.quality,
      gradingInfo.workload,
      gradingInfo.difficulty,
      gradingInfo.distribution,
    ],
  };

  return { statics, global };
};
