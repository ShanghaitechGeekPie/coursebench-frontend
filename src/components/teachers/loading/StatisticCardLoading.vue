<template>
  <div :class="[$vuetify.breakpoint.mdOnly ? 'd-flex' : '', 'justify-center']">
    <div class="pt-4" :style="{ width: $vuetify.breakpoint.mdOnly ? '812px' : '' }">      
      <!-- <div class="d-flex justify-center pt-2">
        <v-sheet class="my-1" color="#e2e2e2" height="18px" width="302px"></v-sheet>
      </div> -->
      <div class="d-flex justify-center pt-2">
        <v-sheet class="my-1" color="#e2e2e2" height="18px" width="302px"></v-sheet>
      </div>
      <div class="d-flex justify-center py-2">
        <v-sheet class="my-1" color="#e2e2e2" height="18px" width="302px"></v-sheet>
      </div>
    </div>
  </div>
</template>
<script>
// TODO: Replace this with skeleton loader

import useStatisticCard from "@/composables/teachers/course/useStatisticCard";

export default {
  setup() {
    const { courseStatistic, statics, status } = useStatisticCard();
    return { courseStatistic, statics, status };
  },
  computed: {
    isEmpty() {
      for (let key in this.courseStatistic.count) {
        if (this.courseStatistic.count[key]) {
          return false;
        }
      }
      return true;
    },
  },
  created() {
    if (this.$vuetify.breakpoint.mdAndDown) {
      this.status.showAll = false;
    }
  },
};
</script>