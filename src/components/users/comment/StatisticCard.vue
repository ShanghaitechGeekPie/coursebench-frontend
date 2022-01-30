<template>
  <v-hover #default="{ hover }" close-delay="50" open-delay="50">
    <v-card class="transition-swing" :elevation="hover ? 8 : 4">
      <v-card-text class="pa-0">
        <v-list nav dense flat class="py-sm-2 py-0">
          <v-list-item class="mb-sm-1 mb-0 px-0 px-sm-3">
            <span class="text-sm-h5 text-subtitle-1 font-weight-bold">统计</span>
          </v-list-item>
          <div class="d-sm-block d-flex justify-space-between">
            <v-list-item class="px-0 px-sm-3">
              <span class="pr-1">
                <v-icon size="18">{{ statics.icons.mdiCommentCheck }}</v-icon>
              </span>
              <span class="text-sm-subtitle-1 font-weight-bold pr-4">
                评价总数
              </span>
              <span>
                {{ commentStatistic.total }}
              </span>
            </v-list-item>
            <v-list-item class="px-0 px-sm-3">
              <span class="pr-1">
                <v-icon size="18">{{ statics.icons.mdiThumbUp }}</v-icon>
              </span>
              <span class="text-sm-subtitle-1 font-weight-bold pr-4">
                获赞总数
              </span>
              <span>
                {{ commentStatistic.score }}
              </span>
            </v-list-item>
          </div>
        </v-list>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script>
import useStatisticCard from "@/composables/users/comment/useStatisticCard";

export default {
  setup() {
    const { commentStatistic, statics, status } = useStatisticCard();
    return { commentStatistic, statics, status };
  },
};
</script>