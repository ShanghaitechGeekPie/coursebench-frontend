<template>
  <div style="min-height: 100%">
    <BackgroundImage />
    <div style="flex-wrap: wrap" class="d-flex justify-center">
      <div class="pa-lg-3 pb-3">
        <div :style="{ width: $vuetify.breakpoint.mdAndDown ? '100vw' : '360px' }">
          <v-card
            :style="adoptiveCardPosition"
            flat
            outlined
            :width="$vuetify.breakpoint.mdAndDown ? '100vw' : '360px'"
            class="pt-6 pb-3 px-7"
          >
            <Profile />
            <StatisticCard />
          </v-card>
        </div>
      </div>
      <div class="pa-3">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-0 pb-lg-0 pb-3">
              <SelectBar />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-sm-3 pt-0">
              <div v-for="(comment, index) in commentText" :key="comment.id">       
                <v-fade-transition>
                  <CommentCard
                    :comment="comment"
                    v-if="
                      commentFilterStatus.selected.some(
                        (school) => school === comment.course.institute
                      )
                    "
                  />
                </v-fade-transition>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import Profile from "@/components/users/profile/Profile";
import BackgroundImage from "@/components/users/profile/BackgroundImage";
import CommentCard from "@/components/users/comment/CommentCard";
import SelectBar from "@/components/users/comment/SelectBar";
import StatisticCard from "@/components/users/comment/StatisticCard";
import useUser from "@/composables/users/useUser";

export default {
  components: {
    Profile,
    Comment,
    BackgroundImage,
    StatisticCard,
    CommentCard,
    SelectBar,
  },
  setup() {
    const { commentText, commentFilterStatus } = useUser();
    return { commentText, commentFilterStatus };
  },
  data() {
    return {
      scrollTop: document.documentElement.scrollTop,
    };
  },
  mounted() {
    document.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
  computed: {
    adoptiveCardPosition() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return {};
      } else if (this.scrollTop <= 40) {
        return {
          transform: "translate(0, -160px)",
        };
      } else {
        return {
          position: "fixed",
          top: "90px",
        };
      }
    }
  }
};
</script>
