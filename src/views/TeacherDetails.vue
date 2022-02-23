<template>
  <div
    :style="{
      background: theme.isDark ? '' : '#f9f9f9',
      'min-height': '100%',
    }"
  >
    <BackgroundImage />
    <div style="flex-wrap: wrap" class="d-flex justify-center">
      <div class="pa-lg-3 pb-3">
        <v-card
          :style="{
            transform: breakpoint.mdAndDown
              ? ''
              : `translate(0, ${
                  -160 + (scrollTop <= 40 ? 0 : scrollTop - 40)
                }px)`,
          }"
          flat
          class="pt-6 pb-3 px-7"
          :width="breakpoint.mdAndDown ? '100vw' : '360'"
        >
          <Detail />
          <StatisticCard />
        </v-card>
      </div>
      <div class="pa-3 pl-0">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-sm-3 pt-0">
              <div
                :style="{
                  width:
                    breakpoint.width - 24 > 1284
                      ? '1284px'
                      : breakpoint.width - 24 + 'px',
                }"
              >
                <div class="d-flex flex-wrap">
                  <CourseCard
                    v-for="(course, index) in courseText"
                    :key="course.id"
                    :course="course"
                    v-if="
                      status.selected.some(
                        (school) => school === course.institute
                      )
                    "
                  />
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