<template>
  <div :class="[$vuetify.breakpoint.mdOnly ? 'd-flex' : '', 'justify-center']">
    <div
      class="pt-4"
      :style="{ width: $vuetify.breakpoint.mdOnly ? '812px' : '' }"
    >
      <!-- <div class="d-flex justify-space-between pt-2">
        <div>
          <v-icon size="18">{{ statics.icons.mdiThumbUpOutline }}</v-icon>
          <span class="text-sm-subtitle-1 pl-1">获评总数</span>
        </div>
        <div class="font-weight-bold" style="width: 16px;">
          {{ courseStatistic.score }}
        </div>
      </div> -->
      <div class="d-flex justify-space-between pt-2">
        <div>
          <div>
            <v-icon size="18">{{ statics.icons.mdiClipboardOutline }}</v-icon>
            <span class="text-sm-subtitle-1 pl-1">开课总数</span>
          </div>
        </div>
        <div class="font-weight-bold" style="width: 16px">
          {{ courseStatistic.total }}
        </div>
      </div>
      <div class="d-flex justify-space-between pt-2">
        <div>
          <div>
            <v-icon size="18">{{ statics.icons.mdiClipboardText }}</v-icon>
            <span class="text-sm-subtitle-1 pl-1">开课统计</span>
          </div>
        </div>
        <div class="transform: translate(0, 1px);">
          <v-icon @click="status.showAll = true" v-if="!status.showAll">
            {{ statics.icons.mdiChevronDown }}
          </v-icon>
          <v-icon @click="status.showAll = false" v-if="status.showAll">
            {{ statics.icons.mdiChevronUp }}
          </v-icon>
        </div>
      </div>
      <v-expand-transition>
        <div class="pl-2" v-if="status.showAll">
          <div
            v-for="(value, key, index) in courseStatistic.count"
            :key="index"
          >
            <div v-if="value">
              <v-checkbox
                dense
                v-model="status.selected"
                :value="key"
                hide-details
              >
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
  </div>
</template>
<script>
import useStatisticCard from '@/composables/teachers/course/useStatisticCard';

export default {
  setup() {
    const { courseStatistic, statics, status } = useStatisticCard();
    return { courseStatistic, statics, status };
  },
  created() {
    if (this.$vuetify.breakpoint.mdAndDown) {
      this.status.showAll = false;
    }
  },
};
</script>
