<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-list nav dense flat class="py-sm-2 py-0">
        <v-list-item class="mb-sm-1 mb-0">
          <span class="text-sm-h5 text-subtitle-1 font-weight-bold">统计</span>
        </v-list-item>
        <div class="d-sm-block d-flex">
          <v-list-item>
            <span class="pr-1">
              <v-icon size="18">{{ statics.icons.mdiCommentCheck }}</v-icon>
            </span>
            <span class="text-sm-subtitle-1 font-weight-bold pr-4">
              评价总数
            </span>
            <span>
              {{ comtinfo.total }}
            </span>
          </v-list-item>
          <v-list-item>
            <span class="pr-1">
              <v-icon size="18">{{ statics.icons.mdiThumbUp }}</v-icon>
            </span>
            <span class="text-sm-subtitle-1 font-weight-bold pr-4">
              获赞总数
            </span>
            <span>
              {{ comtinfo.score }}
            </span>
          </v-list-item>
        </div>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import useInfoCard from "@/composables/users/comment/useInfoCard";

export default {
  setup() {
    const { comtinfo, statics, status } = useInfoCard();
    return { comtinfo, statics, status };
  },
};
</script>