<template>
  <v-card>
    <v-img
      alt="Background Image"
      :src="statics.background"
      :aspect-ratio="screen.background"
    ></v-img>
    <v-container>
      <v-row>
        <div class="pa-2 mt-sm-n12 pl-md-8 pl-sm-5 pb-md-8 pb-sm-4 mt-n7">
          <v-card outlined>
            <v-avatar
              tile
              color="pink"
              :size="screen.avatar"
              class="rounded"
            >
              <span
                class="text-sm-h3 text-h5"
                v-if="userinfo.avatar === ''"
                >{{ userinfo.nickname.slice(0, 1) }}</span
              >
              <v-img
                :src="userinfo.avatar"
                alt="Avatar"
                aspect-ratio="1"
                v-else
              ></v-img>
            </v-avatar>
          </v-card>
        </div>
        <v-info-card :isMobile="screen.isMobile"></v-info-card>
        <v-edit-info :isMobile="screen.isMobile"></v-edit-info>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import useProfile from "@/composables/users/profile/useProfile";
import InfoCard from "@/components/users/profile/InfoCard";
import EditInfo from "@/components/users/profile/EditInfo";

export default {
  setup() {
    const { userinfo, statics, status } = useProfile();
    return { userinfo, statics, status };
  },
  components: {
    "v-info-card": InfoCard,
    "v-edit-info": EditInfo,
  },
  computed: {
    screen() {
      if (this.$vuetify.breakpoint.name === "xs") {
        return {
          avatar: 80,
          background: 3.625,
          isMobile: true,
        };
      } else {
        return {
          avatar: 160,
          background: 4.7375,
          isMobile: false,
        };
      }
    },
  },
};
</script>