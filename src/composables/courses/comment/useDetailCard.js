import { inject } from 'vue';
import { mdiStar, mdiStarOutline } from '@mdi/js';

export default () => {
  const teachers = inject('teachers');
  const selectedTeachers = inject('selectedTeachers');
  const statics = {
    icons: {
      mdiStarOutline,
      mdiStar,
    },
  };

  return { teachers, statics, selectedTeachers };
};
