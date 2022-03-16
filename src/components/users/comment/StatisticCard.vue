<template>
  <div :class="[ breakpoint.mdOnly ? 'd-flex' : '', 'justify-center' ]">
    <div class="pt-4" :style="{ width: breakpoint.mdOnly ? '812px' : '' }">
      <!-- <div class="d-flex justify-space-between pt-2">
      <div>
        <v-icon size="18">{{ statics.icons.mdiThumbUpOutline }}</v-icon>
        <span class="text-sm-subtitle-1 pl-1">获赞总数</span>
      </div>
      <div class="font-weight-bold">
        {{ commentStatistic.score }}
      </div>
    </div> -->
      <div class="d-flex justify-space-between pt-2">
        <div>
          <div>
            <v-icon size="18">{{
              statics.icons.mdiCommentCheckOutline
            }}</v-icon>
            <span class="text-sm-subtitle-1 pl-1">评价总数</span>
          </div>
        </div>
        <div class="font-weight-bold" style="width: 16px;">
          {{ commentStatistic.total }}
        </div>
      </div>
      <div class="d-flex justify-space-between py-2">
        <div>
          <div>
            <v-icon size="18">{{ statics.icons.mdiClipboardText }}</v-icon>
            <span class="text-sm-subtitle-1 pl-1">评价统计</span>
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
            v-for="(value, key, index) in commentStatistic.count"
            :key="index"
            :class="index !== 0 ? 'mt-n4' : ''"
          >
            <div v-if="value">
              <v-checkbox dense v-model="status.selected" :value="key">
                <template #label>
                  <div class="d-flex justify-space-between" style="width: 100%">
                    <div>{{ key }}</div>
                    <div>{{ value }}篇</div>
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
import useStatisticCard from "@/composables/users/comment/useStatisticCard";

export default {
  setup() {
    const { commentStatistic, statics, status } = useStatisticCard();
    return { commentStatistic, statics, status };
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
    };
  },
  created() {
    if (this.breakpoint.mdAndDown) {
      this.status.showAll = false;
    }
  },
};
</script>