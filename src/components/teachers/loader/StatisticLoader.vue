<template>
  <div :class="[$vuetify.breakpoint.mdOnly ? 'd-flex' : '', 'justify-center']">
    <div :style="{ width: $vuetify.breakpoint.mdOnly ? '812px' : '' }">      
      <!-- <div class="d-flex justify-center pt-2">
        <v-sheet class="my-1" color="#e2e2e2" height="18px" width="302px"></v-sheet>
      </div> -->
      <div class="d-flex justify-center" v-for="index in length" :key="index"
        :style="{ 'padding-top': index !== 1 ? offset : '8px' }"
      >
        <v-sheet class="my-1" color="#e2e2e2" height="18px" :width="width"></v-sheet>
      </div>
    </div>
  </div>
</template>
<script>
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
  props: {
    width: {
      type: String,
      default: "302px",
    },
    length: {
      type: Number,
      default: 2,
    },
    offset: {
      type: String,
      default: "8px",    
    }
  }
};
</script>