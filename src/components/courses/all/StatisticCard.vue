<template>
  <div :style="{ width: $vuetify.breakpoint.mdAndDown ? width : '360px' }">
    <v-card class="pt-6 pb-3 px-6" outlined flat>
      <div>
        <div>
          <slot name="header"></slot>
        </div>
        <div class="d-flex justify-space-between">
          <div class="text-h6 d-flex">
            <v-icon class="pr-2">
              {{ statics.icons.mdiCity }}
            </v-icon>
            <div>学院</div>
          </div>
          <div v-if="$vuetify.breakpoint.xsOnly">
            <v-btn
              icon
              v-if="status.showAll"
              @click="status.showAll = !status.showAll"
            >
              <v-icon>{{ statics.icons.mdiChevronUp }}</v-icon>
            </v-btn>
            <v-btn icon v-else @click="status.showAll = !status.showAll">
              <v-icon>{{ statics.icons.mdiChevronDown }}</v-icon>
            </v-btn>
          </div>
          <div v-else></div>
        </div>
        <v-expand-transition>
          <div v-if="status.showAll">
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
        </v-expand-transition>
      </div>
      <div>
        <slot name="footer" :showAll="status.showAll"></slot>
      </div>
      <div v-if="!status.showAll" class="pt-3"></div>
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
    width: {
      type: String,
      default: "",
    },
  },
};
</script>