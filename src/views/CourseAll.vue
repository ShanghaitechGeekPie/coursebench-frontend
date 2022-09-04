<template>
  <div style="min-height: 100%">
    <div
      style="flex-wrap: wrap"
      class="d-flex justify-center flex-row-reverse pt-16"
    >
      <div class="pa-lg-3 pb-3">
        <div
          :style="{ width: $vuetify.breakpoint.mdAndDown ? '100vw' : '360px' }"
        >
          <StatisticCard style="position: fixed; top: 140px" />
        </div>
      </div>
      <div class="pa-3 px-0">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-0 pb-lg-0 pb-3">
              <div class="px-3">
                <SelectBar />
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="px-0">
              <div :style="{ width: adoptiveCardContainerWidth }">
                <!-- <div class="d-flex flex-wrap justify-center justify-lg-start" v-if="status.loading">
                  <div
                    v-for="index in adoptiveCardNumber"
                    :key="index"
                  >
                    <CourseCardLoading />
                  </div>
                </div> -->
                <div class="d-flex flex-wrap justify-center justify-lg-start">
                  <div v-for="(course, index) in courseText" :key="course.id">
                    <v-fade-transition>
                      <CourseCard :course="course" />
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
import StatisticCard from "@/components/courses/all/StatisticCard";
import SelectBar from "@/components/courses/all/SelectBar";
import useCourseAll from "@/composables/courses/all/useCourseAll";
import CourseCard from "@/components/courses/all/CourseCard";

export default {
  setup() {
    const { courseText, status } = useCourseAll();
    return { courseText, status };
  },
  components: {
    SelectBar,
    StatisticCard,
    CourseCard,
  },
  computed: {
    adoptiveCardNumber() {
      return Math.min(Math.floor((this.$vuetify.breakpoint.width - 428) / 428), 3);
    },

    adoptiveCardContainerWidth() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return "";
      } else {
        return this.adoptiveCardNumber * 428 + "px";
      }
    },
  },
};
</script>
