<template>
  <div style="min-height: 100%">
    <BackgroundImage />
    <div style="flex-wrap: wrap" class="d-flex justify-center">
      <div class="pa-lg-3">
        <div :style="{ width: $vuetify.breakpoint.mdAndDown ? '100vw' : '360px' }">
          <v-card
            :style="adoptiveCardPosition"
            flat
            outlined
            :width="$vuetify.breakpoint.mdAndDown ? '100vw' : '360px'"
            class="pt-6 pb-3 px-7"
          >
            <DetailLoading v-if="status.loading" />
            <Detail v-else />
            <StatisticCardLoading v-if="status.loading" />
            <StatisticCard v-else />
          </v-card>
        </div>
      </div>
      <div class="pa-3 px-0">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="px-0">
              <div
                :style="{
                  width: $vuetify.breakpoint.mdAndDown ? '' : Math.floor(($vuetify.breakpoint.width - 428) / 428) * 428 + 'px'
                }"
              >
                <div class="d-flex flex-wrap justify-center justify-lg-start" v-if="status.loading">
                  <div
                    v-for="index in adoptiveCardNumber"
                    :key="index"
                  >
                    <CourseCardLoading />
                  </div>
                </div>
                <div class="d-flex flex-wrap justify-center justify-lg-start">
                  <div v-for="(course, index) in courseText" :key="course.id">
                    <v-fade-transition>
                      <CourseCard
                        :course="course"
                        v-if="status.selected.some((school) => school === course.institute)"
                      />
                    </v-fade-transition>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </div>
  </div>
</template>

<script>
import Detail from "@/components/teachers/detail/Detail"
import DetailLoading from "@/components/teachers/loading/DetailLoading"
import BackgroundImage from "@/components/teachers/detail/BackgroundImage"
import CourseCard from "@/components/teachers/course/CourseCard"
import CourseCardLoading from "@/components/teachers/loading/CourseCardLoading"
import StatisticCard from "@/components/teachers/course/StatisticCard"
import StatisticCardLoading from "@/components/teachers/loading/StatisticCardLoading"
import useTeacherDetail from "@/composables/teachers/useTeacherDetail"

export default {
  components: {
    Detail,
    DetailLoading,
    Comment,
    BackgroundImage,
    StatisticCard,
    StatisticCardLoading,
    CourseCard,
    CourseCardLoading
  },
  setup() {
    const { courseText, status } = useTeacherDetail()
    return { courseText, status }
  },
  data() {
    return {
      scrollTop: document.documentElement.scrollTop,
    }
  },
  computed: {
    adoptiveCardPosition() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return {}
      } else if (this.scrollTop <= 40) {
        return {
          transform: "translate(0, -160px)"
        }
      } else {
        return {
          position: "fixed",
          top: "90px"
        }
      }
    }, 
    adoptiveCardNumber() {
      if (this.$vuetify.breakpoint.width >= 600 && this.$vuetify.breakpoint.width < 1260) {
        return 2
      } else if (Math.floor((this.$vuetify.breakpoint.width - 428) / 428) > 1) {
        return Math.floor((this.$vuetify.breakpoint.width - 428) / 428)
      } else {
        return 1
      }
    }
  }, 
  mounted() {
    document.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop
    })
  }
}
</script>
