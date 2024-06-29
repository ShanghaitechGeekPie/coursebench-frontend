import { inject, reactive, toRefs } from 'vue';
import {
  mdiCommentCheckOutline,
  mdiTriangle,
  mdiChevronDown,
  mdiChevronUp,
  mdiClipboardText,
} from '@mdi/js';

export default () => {
  const commentStatistic = inject('commentStatistic');

  const statics = {
    icons: {
      mdiCommentCheckOutline,
      mdiChevronDown,
      mdiChevronUp,
      mdiTriangle,
      mdiClipboardText,
    },
  };

  const status = reactive({
    showAll: true,
    ...toRefs(inject('commentFilterStatus')),
  });

  return { commentStatistic, statics, status };
};
