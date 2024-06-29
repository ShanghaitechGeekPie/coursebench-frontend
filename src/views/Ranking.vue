<template>
  <div
    style="width: 100%"
    class="d-flex justify-center flex-row-reverse pt-sm-13 pt-6"
  >
    <v-card max-width="800" class="pa-lg-3 pb-3" :width="adoptiveListWidth">
      <v-card-title>Ranking List</v-card-title>
      <v-data-table
        :headers="headers"
        :items="rankList"
        :items-per-page="adoptiveItemCount"
        item-key="nick_name"
        :loading="status.loading"
      ></v-data-table>
    </v-card>
  </div>
</template>
<script>
import useRewardRank from '@/composables/reward/useRewardRank';

export default {
  setup() {
    const { status, rankList, headers } = useRewardRank();
    rankList.value.sort();
    console.log(rankList.value);
    return { status, rankList, headers };
  },
  computed: {
    adoptiveListWidth() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        if (this.$vuetify.breakpoint.xsOnly) {
          return '95%';
        } else if (404 * 2 + 80 > this.$vuetify.breakpoint.width) {
          return '90%';
        } else {
          return '80%';
        }
      } else {
        return '80%';
      }
    },
    adoptiveItemCount() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        if (this.$vuetify.breakpoint.xsOnly) {
          return 5;
        } else if (404 * 2 + 80 > this.$vuetify.breakpoint.width) {
          return 6;
        } else {
          return 8;
        }
      } else {
        return 8;
      }
    },
  },
};
</script>
