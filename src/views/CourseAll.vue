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
              >
                <template #default="{ items }">
                  <div class="d-flex flex-wrap justify-center justify-md-start">
                    <div v-for="(course, index) in items" :key="course.id" class="d-flex">
                      <v-fade-transition>
                        <CourseCard :course="course" 
                          v-if="status.selected.some((item) => item === instituteInfo[course.institute].name)"
                        />
                      </v-fade-transition>
                    </div>
                  </div>
                </template>
                <template #footer>
                  <ElevatedPagination 
                    v-model="status.page"
                    :length="Math.ceil(courseText.length / (adoptiveCardNumber * 3))"
                    :total-visible="5"
                    elevation="0"
                  />
                  <v-pagination
                    v-model="status.page"
                    :length="Math.ceil(courseText.length / (adoptiveCardNumber * 3))"
                    :total-visible="7"
                    elevation="0"
                  ></v-pagination>
                  <div class="py-4 px-2 d-flex justify-end">
                    <div>
                      <div>共</div>
                    </div>
                    <div class="d-flex">
                      <div class="mx-2 pr-1">
                        <v-icon>{{ statics.icons.mdiChevronLeft }}</v-icon>
                      </div>                      
                      <div class="mx-2 pl-1">
                        <v-icon>{{ statics.icons.mdiChevronRight }}</v-icon>
                      </div>
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
    const { statics, courseText, status } = useCourseAll();
    return { instituteInfo, statics, courseText, status };
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
  },
};
</script>
