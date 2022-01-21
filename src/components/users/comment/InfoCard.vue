<template>
  <v-card>
    <v-card-text class="pa-0">
      <v-list nav dense flat>
        <v-list-item>
          <span class="text-sm-h5 font-weight-black">统计</span>
        </v-list-item>
        <v-list-item>
          <span class="text-sm-subtitle-1 font-weight-black pr-sm-4">
            评价总数
          </span>
          <span>
            {{ usercomt.total }}
          </span>
        </v-list-item>
        <v-list-item>
          <span class="text-sm-subtitle-1 font-weight-black pr-sm-4">
            获赞总数
          </span>
          <span>
            {{ usercomt.score }}
          </span>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
import useInfoCard from "@/composables/users/comment/useInfoCard";

export default {
  setup() {
    const { usercomt, statics, status } = useInfoCard();
    return { usercomt, statics, status };
  },
};
</script>