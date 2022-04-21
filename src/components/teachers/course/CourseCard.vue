<template>
  <v-lazy class="px-3">
    <div 
        :style="{ 
          width: 
            breakpoint.mdAndDown 
            ? breakpoint.xsOnly 
              ? 'calc(100vw - 24px)' 
              : 404 * 2 > breakpoint.width ? '300px' : '404px' 
            : '404px' 
        }"
      >
        <v-card class="mb-3" flat 
          height="303" 
          outlined
        >
          <v-container>
            <v-row class="d-flex justify-space-between">
              <v-col class="d-flex justify-space-between">
                <div style="transform: translate(8px, 0)">
                  <AvatarContainer
                    :name="statics.short[course.institute]"
                    :color="statics.background[course.institute]"
                    size="45"
                  />
                </div>
                <div class="pr-2">
                  <div class="text-caption">{{ course.code }}</div>
                  <div class="text-caption" style="text-align: end">
                    {{ course.credit }}学分
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <v-row>
              <v-col cols="12" class="pt-0">
                <div
                  @click="$router.push({ path: `course/${course.id}` })"
                  class="router-container d-flex"
                >
                  <div>
                    <div style="transform: translate(0, -2px)" class="pr-2">
                      <v-icon size="20">
                        {{ statics.icons.mdiChartBubble }}
                      </v-icon>
                    </div>
                  </div>
                  <div>
                    <div
                      class="justify-start text-body-1 font-weight-bold overflow"
                    >
                      {{ course.name }}
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>
                  <div class="d-flex justify-space-between px-2 pb-3">
                    <div class="text-body-2" style="min-width: 57px">
                      课程质量
                    </div>
                    <div style="width: 64%">
                      <v-progress-linear
                        v-model="course.score[0] * 20"
                        :color="statics.color[score[0]]"
                        class="mt-2"
                        style="pointer-events: none;"
                      >
                      </v-progress-linear>
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="statics.color[score[0]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[score[0]]
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-space-between px-2 py-3">
                    <div class="text-body-2" style="min-width: 57px;">作业用时</div>
                    <div style="width: 64%;">
                      <v-progress-linear
                        v-model="course.score[1] * 20"
                        :color="statics.color[score[1]]"
                        class="mt-2"
                        style="pointer-events: none;"
                      >
                      </v-progress-linear>
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="statics.color[score[1]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[score[1]]
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-space-between px-2 py-3">
                    <div class="text-body-2" style="min-width: 57px;">考核难度</div>
                    <div style="width: 64%;">
                      <v-progress-linear
                        v-model="course.score[2] * 20"
                        :color="statics.color[score[2]]"
                        class="mt-2"
                        style="pointer-events: none;"
                      >
                      </v-progress-linear>
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="statics.color[score[2]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[score[2]]
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-space-between px-2 py-3">
                    <div class="text-body-2" style="min-width: 57px;">给分情况</div>
                    <div style="width: 64%;">
                      <v-progress-linear
                        v-model="course.score[3] * 20"
                        :color="statics.color[score[3]]"
                        class="mt-2"
                        style="pointer-events: none;"
                      >
                      </v-progress-linear>
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="statics.color[score[3]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[score[3]]
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
    </div>
  </v-lazy>
</template>
<script>
import useCourseCard from "@/composables/teachers/course/useCourseCard";
import AvatarContainer from "@/components/users/profile/AvatarContainer";

export default {
  setup() {
    const { statics } = useCourseCard();
    return { statics };
  },
  data() {
    return {
      score: new Array(),
      breakpoint: this.$vuetify.breakpoint,
    };
  },
  props: {
    course: Object,
  },
  components: {
    AvatarContainer,
  },
  created() {
    for (let element of this.course.score) {
      let rounded = Math.floor(element) + 1;
      if (element == 0) {
        rounded = 0;
      }
      this.score.push(rounded);
    }
  },
};
</script>
<style scoped>
.router-container:hover {
  cursor: pointer;
}

.overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>