<template>
  <div :style="{ background: theme.isDark ? '' : '#f9f9f9', 'min-height': '100%' }">
    <BackgroundImage />
    <div style="flex-wrap: wrap" class="d-flex justify-center">
      <div class="pa-lg-3 pb-3">
        <div :style="{ width: breakpoint.mdAndDown ? '100vw' : '360px' }">
          <v-card
            :style="
              breakpoint.mdAndDown
                ? {}
                : scrollTop <= 40
                ? {
                    transform: 'translate(0, -160px)'
                  }
                : {
                    position: 'fixed',
                    top: '90px'
                  }
            "
            flat
            outlined
            :width="breakpoint.mdAndDown ? '100vw' : '360px'"
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
                    v-if="status.selected.some((school) => school === comment.course.institute)"
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
import Profile from "@/components/users/profile/Profile"
import BackgroundImage from "@/components/users/profile/BackgroundImage"
import CommentCard from "@/components/users/comment/CommentCard"
import SelectBar from "@/components/users/comment/SelectBar"
import StatisticCard from "@/components/users/comment/StatisticCard"
import useUser from "@/composables/users/useUser"

export default {
  components: {
    Profile,
    Comment,
    BackgroundImage,
    StatisticCard,
    CommentCard,
    SelectBar
  },
  setup() {
    const { commentText, status } = useUser()
    return { commentText, status }
  },
  data: () => ({
    scrollTop: document.documentElement.scrollTop,
    breakpoint: this.$vuetify.breakpoint,
    theme: this.$vuetify.theme
  }),
  mounted() {
    document.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop
    })
  }
}
</script>
