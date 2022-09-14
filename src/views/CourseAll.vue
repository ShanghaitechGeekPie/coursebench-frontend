<template>
  <div style="min-height: 100%">
    <div style="flex-wrap: wrap" class="d-flex justify-center flex-row-reverse pt-16">
      <div class="pa-lg-3 pb-3">
        <div :class="[$vuetify.breakpoint.mdAndDown ? '' : 'statistic-card-container']">          
          <div v-if="status.loading"
            :style="{ width: $vuetify.breakpoint.mdAndDown ? adoptiveCardContainerWidth + 'px': '360px' }"
          >     
            <v-card class="pt-6 pb-8 px-6" outlined flat>
              <v-sheet color="#e2e2e2" class="mx-lg-1 mx-2 mb-3" height="30px" width="80px"></v-sheet>
              <StatisticLoader 
                :length="9" 
                offset="16px" 
                :width="$vuetify.breakpoint.lgAndUp ? 'calc(100% - 8px)' : 'calc(100% - 16px)'" 
              />
            </v-card>
          </div>
          <StatisticCard 
            :style="$vuetify.breakpoint.mdAndDown ? {} : { position: 'fixed', top: '140px'}" 
            :width="adoptiveCardContainerWidth + 'px'"
            v-else
          />
        </div>
      </div>
      <div class="pa-3 px-0" 
        :style="{ width: this.$vuetify.breakpoint.smAndDown ? '' : this.adoptiveCardNumber * 428 + 'px' }"
      >
        <div>
          <div class="mx-3 d-md-block d-block d-sm-flex justify-center">
            <SelectLoader :width="adoptiveCardContainerWidth + 'px'" type="select" v-if="status.loading" />
            <SelectBar :width="adoptiveCardContainerWidth + 'px'" v-else />
          </div>
          <div class="pt-6 px-0">
            <div 
              :style="{ width: this.$vuetify.breakpoint.smAndDown ? '' : this.adoptiveCardNumber * 428 + 'px' }"
            >
              <div class="d-flex justify-center" v-if="status.loading">
                <div :style="{ width: adoptiveCardContainerWidth + 24 + 'px' }">
                  <div class="d-flex flex-wrap justify-start">                        
                    <div v-for="index in adoptiveCardNumber * 2" :key="index" class="d-flex">
                      <CourseLoader :width="adoptiveCardWidth + 'px'" height="303px" header="image" />
                    </div>
                  </div>
                </div>
              </div>
              <v-data-iterator
                :items="courseText"
                :items-per-page="adoptiveCardNumber * 3"
                :page="status.page"
                hide-default-footer
                v-if="courseText.length > 0 && !status.loading"
              >
                <template #default="{ items }">
                  <div class="d-flex justify-center">
                    <div :style="{ width: adoptiveCardContainerWidth + 24 + 'px' }">
                      <div class="d-flex flex-wrap justify-start">                        
                        <div v-for="(course, index) in items" :key="course.id" class="d-flex">
                          <v-fade-transition>
                            <CourseCard :course="course" :width="adoptiveCardWidth + 'px'" />
                          </v-fade-transition>
                        </div>
                      </div>
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
                        :total-visible="$vuetify.breakpoint.xsOnly ? 5 : 7"
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
import CourseLoader from "@/components/teachers/loader/CourseLoader"
import SelectLoader from "@/components/teachers/loader/SelectLoader"
import StatisticLoader from "@/components/teachers/loader/StatisticLoader"

export default {
  setup() {
    const { courseText, status, courseFilterStatus } = useCourseAll();

    return { instituteInfo, courseText, status, courseFilterStatus };
  },
  components: {
    SelectBar,
    StatisticCard,
    CourseCard,
    ElevatedPagination, 
    CourseLoader, 
    SelectLoader, 
    StatisticLoader
  },
  computed: {
    adoptiveCoursePage() {
      return Math.ceil(this.courseText.length / (this.adoptiveCardNumber * 3))
    }, 

    adoptiveCardWidth() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        if (this.$vuetify.breakpoint.xsOnly) {
          return this.$vuetify.breakpoint.width - 24;
        } else if (404 * 2 + 80 > this.$vuetify.breakpoint.width) {
          return (this.$vuetify.breakpoint.width - 80) / 2;
        } else {
          return 404;
        }
      } else {
        return 404;
      }
    },

    adoptiveCardNumber() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return 1;
      } else if (this.$vuetify.breakpoint.mdAndDown) {
        return 2;
      } else {
        return Math.min(Math.floor((this.$vuetify.breakpoint.width - 428) / 428), 3);
      }
    },    

    adoptiveCardContainerWidth() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return this.$vuetify.breakpoint.width - 24
      } else if (this.$vuetify.breakpoint.smOnly) {
        return this.adoptiveCardWidth * 2 + 24
      } else {
        return this.adoptiveCardNumber * 428 - 24;
      }    
    }
  },
};
</script>
<style scoped>
.statistic-card-container {
  width: 360px;
}
</style>