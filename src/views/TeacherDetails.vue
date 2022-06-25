<template>
  <div
    :style="{
      background: theme.isDark ? '' : '#f9f9f9',
      'min-height': '100%',
    }"
  >
    <BackgroundImage />
    <div style="flex-wrap: wrap" class="d-flex justify-center">
      <div class="pa-lg-3">
        <div :style="{ width: breakpoint.mdAndDown ? '100vw' : '360px' }">
          <v-card
            :style="
              breakpoint.mdAndDown
                ? {}
                : scrollTop <= 40
                ? {
                    transform: 'translate(0, -160px)',
                  }
                : {
                    position: 'fixed',
                    top: '90px',
                  }
            "
            flat
            outlined
            class="pt-6 pb-3 px-7"
          >
            <Detail />
            <StatisticCard />
          </v-card>
        </div>
      </div>
      <div class="pa-3 px-0">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="px-0">
              <div
                :style="{
                  width: breakpoint.mdAndDown
                    ? ''
                    : Math.floor((breakpoint.width - 428) / 428) * 428 + 'px',
                }"
              >
                <div class="d-flex flex-wrap justify-center justify-lg-start">
                  <div v-for="(course, index) in courseText" :key="course.id">
                    <v-fade-transition>
                      <CourseCard
                        :course="course"
                        v-if="
                          status.selected.some(
                            (school) => school === course.institute
                          )
                        "
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
import Detail from "@/components/teachers/detail/Detail";
import BackgroundImage from "@/components/teachers/detail/BackgroundImage";
import CourseCard from "@/components/teachers/course/CourseCard";
import StatisticCard from "@/components/teachers/course/StatisticCard";
import useTeacherDetail from "@/composables/teachers/useTeacherDetail";

export default {
  setup() {
    const { courseText, status } = useTeacherDetail();
    return { courseText, status };
  },
  data() {
    return {
      scrollTop: document.documentElement.scrollTop,
      breakpoint: this.$vuetify.breakpoint,
      theme: this.$vuetify.theme,
    };
  },
  components: {
    Detail,
    Comment,
    BackgroundImage,
    StatisticCard,
    CourseCard,
  },
  mounted() {
    document.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
};
</script>