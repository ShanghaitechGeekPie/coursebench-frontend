<template>
  <v-card
    flat
    outlined
    :width="$vuetify.breakpoint.mdAndDown ? '100vw' : '360px'"
    class="pt-6 pb-3 px-7"
  >
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
    <div>!!ORDER!!</div>
  </v-card>
</template>
<script>
import useCourseFilter from "@/composables/courses/all/useCourseFilter";

export default {
  setup() {
    const { statics, courseStatistic, status } = useCourseFilter();
    return {
      statics, 
      courseStatistic,
      status,
    };
  },
};
</script>