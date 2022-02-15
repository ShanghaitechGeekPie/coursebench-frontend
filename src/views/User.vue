<template>
  <div>
    <BackgroundImage />
    <div style="background: #f9f9f9" class="d-flex justify-center">
      <div class="pa-3">
        <v-card
          style="transform: translate(0, -13vh)"
          flat
          class="pt-6 px-7"
          width="360"
        >
          <Profile />
          <StatisticCard />
        </v-card>
      </div>
      <div class="pa-3">
        <Comment />
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/users/profile/Profile";
import BackgroundImage from "@/components/users/profile/BackgroundImage";
import Comment from "@/components/users/comment/Comment";
import StatisticCard from "@/components/users/comment/StatisticCard";
import useUser from "@/composables/users/useUser";

export default {
  setup() {
    useUser();
  },
  components: {
    Profile,
    Comment,
    BackgroundImage,
    StatisticCard,
  },
};
</script>