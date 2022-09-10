<template>
  <div
    :style="{
      width: $vuetify.breakpoint.mdAndDown
        ? adoptiveStatisticCardContainerWidth
        : '360px',
    }"
  >
    <v-card class="pt-6 pb-3 px-6 mx-3 mx-sm-0 mx-md-3 mx-lg-0" outlined flat>
      <div>
        <div class="text-h6 d-flex">
          <v-icon class="pr-2">
            {{ statics.icons.mdiCity }}
          </v-icon>
          <div>学院</div>
        </div>
        <div
          v-for="(value, key, index) in courseStatistic.count"
          :key="index"
          :class="index !== 0 ? 'mt-n4' : ''"
        >
          <div class="pt-2">
            <v-checkbox dense v-model="status.selected" :value="key">
              <template #label>
                <div class="d-flex justify-space-between" style="width: 100%">
                  <div>{{ key }}</div>
                  <div>{{ value }}节</div>
                </div>
              </template>
            </v-checkbox>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>
<script>
import useStatisticCard from "@/composables/courses/all/useStatisticCard";

export default {
  setup() {
    const { statics, courseStatistic, status } = useStatisticCard();
    return {
      statics,
      courseStatistic,
      status,
    };
  },
  props: {
    "card-width": {
      type: [String, Number],
      default: "",
    },
    "card-number": {
      type: [String, Number],
      default: "",
    },
  },
  computed: {
    adoptiveStatisticCardContainerWidth() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return "100vw"; // not the same with the original one,
        // since the implementation of this is different
      } else if (this.$vuetify.breakpoint.smOnly) {
        return `${this.cardWidth * 2 + 24}px`;
      } else {
        return this.cardNumber * 428 + "px";
      }
    },
  },
};
</script>