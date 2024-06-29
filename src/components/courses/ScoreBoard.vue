<template>
  <div>
    <div v-for="index in [1, 2, 3, 4, 5]">
      <ScoreLine
        :starNum="6 - index"
        :percentage="Math.round(starPercent[5 - index] * 100)"
        :color="color ? color : scoreInfo[6 - index].color"
        :star-color="color ? color : 'yellow darken-3'"
        style="max-height: 13px"
      ></ScoreLine>
    </div>
  </div>
</template>

<script>
import ScoreLine from '@/components/courses/ScoreLine';
import { scoreInfo } from '@/composables/global/useStaticData';

export default {
  components: { ScoreLine },
  props: {
    starPercent: Array,
    color: {
      type: String,
      default: '',
    },
  },
  setup() {
    return { scoreInfo };
  },
};
</script>

<style scoped></style>
