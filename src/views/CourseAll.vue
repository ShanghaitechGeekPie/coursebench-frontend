<template>
  <div style="min-height: 100%">
    <div style="flex-wrap: wrap" class="d-flex justify-center flex-row-reverse pt-16">
      <div class="pa-lg-3 pb-3">
        <div :style="{ width: $vuetify.breakpoint.mdAndDown ? '100vw' : '360px' }">
          <StatisticCard :style="$vuetify.breakpoint.mdAndDown ? {} : { position: 'fixed', top: '140px'}" />
        </div>
      </div>
      <div class="pa-3 px-0" :style="{ width: adoptiveCardContainerWidth }">
        <div>
          <div class="mx-3">
            <SelectBar />
          </div>
          <div class="pt-6 px-0">
            <div :style="{ width: adoptiveCardContainerWidth }">
              <!-- <div class="d-flex flex-wrap justify-center justify-lg-start" v-if="status.loading">
                <div
                  v-for="index in adoptiveCardNumber"
                  :key="index"
                >
                  <CourseCardLoading />
                </div>
              </div> -->
              <v-data-iterator
                :items="courseText"
                :items-per-page="adoptiveCardNumber * 3"
                :page="status.page"
                hide-default-footer
              >
                <template #default="{ items }">
                  <div class="d-flex flex-wrap justify-center justify-md-start">
                    <div v-for="(course, index) in items" :key="course.id" class="d-flex">
                      <v-fade-transition>
                        <CourseCard :course="course" 
                          v-if="courseFilterStatus.selected.some((item) => item === course.institute)"                          
                        />
                      </v-fade-transition>
                    </div>
                  </div>
                </template>
                <template #footer>
                  <div class="py-1 mt-2 d-flex justify-center justify-lg-start"
                    v-if="adoptiveCoursePage > 1"
                  >
                    <div class="mx-1">
                      <ElevatedPagination 
                        v-model="status.page"
                        :length="adoptiveCoursePage"
                        :total-visible="6"
                        elevation="0"
                        outlined
                      />
                    </div>
                  </div>
                </template>
              </v-data-iterator>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import StatisticCard from "@/components/courses/all/StatisticCard";
import SelectBar from "@/components/courses/all/SelectBar";
import useCourseAll from "@/composables/courses/all/useCourseAll";
import CourseCard from "@/components/courses/all/CourseCard";
import ElevatedPagination from "@/components/courses/all/ElevatedPagination";
import { instituteInfo } from "@/composables/global/useStaticData";

export default {
  setup() {
    const { courseText, status, courseFilterStatus } = useCourseAll();
    
    return { instituteInfo, courseText, status, courseFilterStatus };
  },
  components: {
    SelectBar,
    StatisticCard,
    CourseCard,
    ElevatedPagination
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
      if (this.$vuetify.breakpoint.xsOnly) {
        return 1;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        return 2;
      } else {
        return Math.min(Math.floor((this.$vuetify.breakpoint.width - 428) / 428), 3);;
      }
    },

    adoptiveCardContainerWidth() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return "";
      } else {
        return this.adoptiveCardNumber * 428 + "px";
      }
    },

    adoptiveCoursePage() {
      return Math.ceil(this.courseText.length / (this.adoptiveCardNumber * 3))
    }
  },
};
</script>
