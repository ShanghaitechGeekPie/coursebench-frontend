<template>
  <v-hover #default="{ hover }" close-delay="50" open-delay="50">
    <v-card :elevation="hover ? 8 : 4">
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
                  v-if="userProfile.avatar === ''"
                  >{{ userProfile.nickname.slice(0, 1) }}</span
                >
                <v-img
                  :src="userProfile.avatar"
                  alt="Avatar"
                  aspect-ratio="1"
                  v-else
                ></v-img>
              </v-avatar>
            </v-card>
          </div>
          <ProfileCard :isMobile="screen.isMobile"/>
          <EditProfile :isMobile="screen.isMobile"/>
        </v-row>
      </v-container>
    </v-card> 
  </v-hover>
</template>
<script>
import useProfile from "@/composables/users/profile/useProfile";
import ProfileCard from "@/components/users/profile/ProfileCard";
import EditProfile from "@/components/users/profile/EditProfile";

export default {
  setup() {
    const { userProfile, statics, status } = useProfile();
    return { userProfile, statics, status };
  },
  components: { ProfileCard, EditProfile, },
  computed: {
    screen() {
      return this.$vuetify.breakpoint.name === "xs" ? {
          avatar: 80,
          background: 3.625,
          isMobile: true,
        } : {
          avatar: 160,
          background: 4.7375,
          isMobile: false,
        }
    },
  },
};
</script>