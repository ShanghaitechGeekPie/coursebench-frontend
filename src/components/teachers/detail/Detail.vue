<template>
  <v-hover #default="{ hover }" close-delay="50" open-delay="50">
    <v-card class="transition-swing" :elevation="hover ? 8 : 4">
      <v-responsive :aspect-ratio="breakpoint.name === 'xs' ? 3.625 : 4.7375">
        <v-card
          :color="statics.background[teacherDetail.institute]"
          height="100%"
          class="d-flex justify-center"
        >
        <div class="d-flex justify-center flex-column">
          <img :src="statics.logo"
            :width="breakpoint.name === 'xs' ? 180 : 300"
            :height="breakpoint.name === 'xs' ? 60 : 100"
            alt="SHTU Logo"
          ></img>
        </div>
        </v-card>
      </v-responsive>
      <v-container>
        <v-row>
          <div class="pa-2 mt-sm-n12 pl-md-8 pl-sm-5 pb-md-8 pb-sm-4 mt-n7">
            <v-card outlined>
              <v-avatar
                tile
                color="white"
                :size="breakpoint.name === 'xs' ? 80 : 160"
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
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint
    }
  }, 
  components: {
    DetailCard,
  },
};
</script>