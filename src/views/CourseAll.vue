<template>
  <div style="min-height: 100%">
    <div style="flex-wrap: wrap" class="d-flex justify-center flex-row-reverse pt-16">
      <div class="pa-lg-3 pb-3">
        <div :style="{ width: $vuetify.breakpoint.mdAndDown ? '100vw' : '360px' }">
          <StatisticCard :style="$vuetify.breakpoint.mdAndDown ? {} : { position: 'fixed', top: '140px'}" />
        </div>
      </div>
      <div class="pa-3 px-0" :style="{ width: adoptiveCardContainerWidth }">
        <v-container class="py-sm-3 py-0">
          <v-row>
            <v-col class="pl-sm-0 pr-lg-3 pr-0 pl-0 pr-0 pt-0 pb-lg-0 pb-3">
              <div class="pl-3 pr-lg-0 pr-3">
                <SelectBar />
              </div>
            </v-col>
          </v-row>
          <v-row class="pt-4">
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
                <div class="d-flex flex-wrap justify-center justify-md-start">
                  <div v-for="(course, index) in courseText" :key="course.id" class="d-flex">
                    <v-fade-transition>
                      <CourseCard :course="course" 
                        v-if="status.selected.some((item) => item === instituteInfo[course.institute].name)"
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
import StatisticCard from "@/components/courses/all/StatisticCard";
import SelectBar from "@/components/courses/all/SelectBar";
import useCourseAll from "@/composables/courses/all/useCourseAll";
import CourseCard from "@/components/courses/all/CourseCard";
import { instituteInfo } from "@/composables/global/useStaticData";

export default {
  setup() {
    const { courseText, status } = useCourseAll();
    return { instituteInfo, courseText, status };
  },
  components: {
    SelectBar,
    StatisticCard,
    CourseCard,
  },
  computed: {
    adoptiveFakeCardNumber() {
      if (this.$vuetify.breakpoint.width >= 600 && this.$vuetify.breakpoint.width < 1260) {
        return 2
      } else if (Math.floor((this.$vuetify.breakpoint.width - 428) / 428) > 1) {
        return Math.min(Math.floor((this.$vuetify.breakpoint.width - 428) / 428), 3)
      } else {
        return 1
      }
    }, 

    adoptiveCardNumber() {
      return Math.min(Math.floor((this.$vuetify.breakpoint.width - 428) / 428), 3);
    },

    adoptiveCardContainerWidth() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return "";
      } else if (this.$vuetify.breakpoint.mdOnly) {
        return (this.adoptiveCardNumber + 1) * 428 + "px"
      } else {
        return this.adoptiveCardNumber * 428 + "px";
      }
    },  
  },
};
</script>
