<template>
  <v-hover #default="{ hover }" close-delay="50" open-delay="50">
    <v-card class="transition-swing" :elevation="hover ? 8 : 4">
      <v-responsive :aspect-ratio="screen.background">
        <v-sheet
          :color="statics.background[teacherDetail.school]"
          height="100%"
        ></v-sheet>
      </v-responsive>
      <v-container>
        <v-row>
          <div class="pa-2 mt-sm-n12 pl-md-8 pl-sm-5 pb-md-8 pb-sm-4 mt-n7">
            <v-card outlined>
              <v-avatar
                tile
                color="white"
                :size="screen.avatar"
                class="rounded"
              >
                <span
                  class="text-sm-h3 text-h5"
                  v-if="teacherDetail.avatar === ''"
                  >{{ teacherDetail.name.slice(0, 1) }}</span
                >
                <v-img
                  :src="teacherDetail.avatar"
                  alt="Avatar"
                  aspect-ratio="1"
                  v-else
                ></v-img>
              </v-avatar>
            </v-card>
          </div>
          <DetailCard />
        </v-row>
      </v-container>
    </v-card>
  </v-hover>
</template>
<script>
import useDetail from "@/composables/teachers/detail/useDetail";
import DetailCard from "@/components/teachers/detail/DetailCard";

export default {
  setup() {
    const { teacherDetail, statics, status } = useDetail();
    return { teacherDetail, statics, status };
  },
  components: {
    DetailCard,
  },
  computed: {
    screen() {
      return this.$vuetify.breakpoint.name === "xs"
        ? {
            avatar: 80,
            background: 3.625,
          }
        : {
            avatar: 160,
            background: 4.7375,
          };
    },
  },
};
</script>