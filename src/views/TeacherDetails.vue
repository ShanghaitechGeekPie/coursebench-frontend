<template>
  <div style="min-height: 100%">
    <ImageLoader v-if="status.loading" />
    <BackgroundImage
      :color="
        $vuetify.theme.isDark
          ? 'grey darken-3'
          : instituteInfo[teacherDetail.institute].color
      "
      v-else
    />
    <div style="flex-wrap: wrap" class="d-flex justify-center">
      <div class="pa-lg-3">
        <div
          :style="{ width: $vuetify.breakpoint.mdAndDown ? '100vw' : '360px' }"
        >
          <v-card
            :style="adoptiveCardPosition"
            flat
            outlined
            :width="$vuetify.breakpoint.mdAndDown ? '100vw' : '360px'"
            class="py-6 px-7"
          >
            <DetailLoader v-if="status.loading" />
            <Detail v-else />
            <StatisticLoader v-if="status.loading" class="pt-4" />
            <StatisticCard v-else />
          </v-card>
        </div>
      </div>
      <div
        class="pa-3 px-0"
        :style="{
          width: this.$vuetify.breakpoint.smAndDown
            ? ''
            : this.adoptiveCardNumber * 428 + 'px',
        }"
      >
        <div class="py-sm-3 py-0">
          <div>
            <div class="px-0">
              <div
                :style="{
                  width: this.$vuetify.breakpoint.smAndDown
                    ? ''
                    : this.adoptiveCardNumber * 428 + 'px',
                }"
              >
                <div class="d-flex justify-center">
                  <div
                    :style="{ width: adoptiveCardContainerWidth + 24 + 'px' }"
                  >
                    <div
                      class="d-flex flex-wrap justify-start"
                      v-if="status.loading"
                    >
                      <div
                        v-for="index in adoptiveCardNumber * 2"
                        :key="index"
                        class="d-flex"
                      >
                        <CourseLoader
                          :width="adoptiveCardWidth + 'px'"
                          height="303px"
                        />
                      </div>
                    </div>
                    <div
                      v-else-if="
                        courseText.filter((course) =>
                          courseFilterStatus.selected.some(
                            (school) => school === course.institute,
                          ),
                        ).length === 0
                      "
                    >
                      <Nothing class="py-16" />
                    </div>
                    <div class="d-flex flex-wrap justify-start" v-else>
                      <div
                        v-for="(course, index) in courseText"
                        :key="course.id"
                        class="d-flex"
                      >
                        <v-fade-transition>
                          <CourseCard
                            :course="course"
                            :width="adoptiveCardWidth + 'px'"
                            v-if="
                              courseFilterStatus.selected.some(
                                (school) => school === course.institute,
                              )
                            "
                          />
                        </v-fade-transition>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Detail from '@/components/teachers/detail/Detail';
import BackgroundImage from '@/components/teachers/detail/BackgroundImage';
import CourseCard from '@/components/teachers/course/CourseCard';
import StatisticCard from '@/components/teachers/course/StatisticCard';
import useTeacherDetail from '@/composables/teachers/useTeacherDetail';
import CourseLoader from '@/components/teachers/loader/CourseLoader';
import DetailLoader from '@/components/teachers/loader/DetailLoader';
import StatisticLoader from '@/components/teachers/loader/StatisticLoader';
import ImageLoader from '@/components/teachers/loader/ImageLoader';
import Nothing from '@/components/global/Nothing';
import { instituteInfo } from '@/composables/global/useStaticData';

export default {
  components: {
    Detail,
    Comment,
    BackgroundImage,
    StatisticCard,
    CourseCard,
    CourseLoader,
    DetailLoader,
    StatisticLoader,
    ImageLoader,
    Nothing,
  },
  setup() {
    const { courseText, status, courseFilterStatus, teacherDetail } =
      useTeacherDetail();
    return {
      courseText,
      status,
      courseFilterStatus,
      instituteInfo,
      teacherDetail,
    };
  },
  data() {
    return {
      scrollTop: document.documentElement.scrollTop,
    };
  },
  computed: {
    adoptiveCardPosition() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return {};
      } else if (this.scrollTop <= 40) {
        return {
          transform: 'translate(0, -160px)',
        };
      } else {
        return {
          position: 'fixed',
          top: '90px',
        };
      }
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
        return Math.min(
          Math.floor((this.$vuetify.breakpoint.width - 428) / 428),
          3,
        );
      }
    },

    adoptiveCardContainerWidth() {
      if (this.$vuetify.breakpoint.xsOnly) {
        return this.$vuetify.breakpoint.width - 24;
      } else if (this.$vuetify.breakpoint.smOnly) {
        return this.adoptiveCardWidth * 2 + 24;
      } else {
        return this.adoptiveCardNumber * 428 - 24;
      }
    },
  },
  mounted() {
    document.addEventListener('scroll', () => {
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
};
</script>
