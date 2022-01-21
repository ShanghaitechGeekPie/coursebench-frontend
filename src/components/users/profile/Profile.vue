<template>
  <v-container class="px-sm-3 px-0">
    <v-row justify="center">
      <v-col xl="7" class="pt-0 px-sm-3 px-0">
        <v-card>
          <v-img
            alt="Background Image"
            :src="statics.background"
            :height="screen.background"
          ></v-img>
          <v-container>
            <v-row>
              <div class="pa-2 mt-sm-n12 pl-md-8 pl-sm-5 pb-md-8 pb-sm-4 mt-n7">
                <v-card outlined>
                  <v-avatar tile color="pink" :size="screen.avatar" class="rounded">
                    <span v-html="userinfo.avatar"></span>
                  </v-avatar>
                </v-card>
              </div>
              <v-info-card :isMobile="screen.isMobile"></v-info-card>
              <v-edit-info :isMobile="screen.isMobile"></v-edit-info>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import useProfile from "@/composables/users/useProfile";
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
          background: 120, 
          isMobile: true, 
        }
      } else {
        return {
          avatar: 160, 
          background: 240, 
          isMobile: false, 
        }
      }
    }
  }
};
</script>