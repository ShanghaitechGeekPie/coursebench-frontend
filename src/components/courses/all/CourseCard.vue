<template>
  <v-lazy class="px-3">
    <div :style="{ width: width }">
      <v-hover>
        <template #default="{ hover }">
          <v-card 
            class="mb-3" 
            flat 
            height="303" 
            outlined 
            :style="hover ? { cursor: 'pointer' } : {}"
            @click="$router.push('/course/' + course.id)"
          >
            <v-sheet
              width="100%"
              height="25%"
              :color="instituteInfo[course.institute].color"
            ></v-sheet>
            <v-container>
              <v-row class="d-flex justify-space-between">
                <v-col class="d-flex justify-space-between">
                  <div class="pl-2">
                    <div class="d-flex">
                      <div class="pr-4">
                        <v-icon
                          size="40"
                          :color="instituteInfo[course.institute].color"
                        >
                          {{ statics.icons.mdiSchool }}
                        </v-icon>
                      </div>
                      <div>
                        <div
                          class="
                            justify-start
                            text-body-1
                            font-weight-bold
                            overflow
                          "
                        >
                          {{ course.name }}
                        </div>
                        <div
                          class="text-caption"
                          style="transform: translate(0, -2px)"
                        >
                          {{ course.institute }}
                        </div>
                      </div>
                    </div>
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
                <v-col class="d-flex justify-space-between px-5">
                  <div class="d-flex" v-for="index in [0, 1]" :key="index">
                    <div
                      class="text-body-2 pr-2 font-weight-bold"
                      style="min-width: 57px"
                    >
                      {{ judgeItems[index] }}
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="scoreInfo[roundedScore[index]].color"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          scoreInfo[roundedScore[index]].label
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex justify-space-between px-5">
                  <div class="d-flex" v-for="index in [2, 3]" :key="index">
                    <div
                      class="text-body-2 pr-2 font-weight-bold"
                      style="min-width: 57px"
                    >
                      {{ judgeItems[index] }}
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="scoreInfo[roundedScore[index]].color"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          scoreInfo[roundedScore[index]].label
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-container>
            <div class="pt-3">
              <div>
                <div class="px-5 text-caption">
                  
                  <div v-if="course.comment_num >= enoughDataThreshold">
                    共获评价{{course.comment_num}}条，综合评分：{{(averageScore / 20).toFixed(1)}}/5.0
                  </div>
                  <div v-else-if="course.comment_num > 0">
                    共获评价{{course.comment_num}}条，不足以给出综合评分
                  </div>
                  <div v-else>
                    数据不足
                  </div>
                </div>            
              </div>
              <div>
                <div style="width: 100%" class="px-5">
                  <v-progress-linear
                    v-model="course.comment_num < enoughDataThreshold ? 0 : averageScore"
                    :color="scoreInfo[roundScore(averageScore / 20, course['comment_num'])].color"
                    class="mt-2"
                    style="pointer-events: none"
                  >
                  </v-progress-linear>
                </div>
              </div>
            </div>
            <v-fade-transition>
              <v-overlay
                v-if="hover"
                absolute
                opacity="0.1"
              ></v-overlay>
            </v-fade-transition>
          </v-card>
        </template>
      </v-hover>
    </div>
  </v-lazy>
</template>
<script>
import useCourseCard from "@/composables/courses/all/useCourseCard";
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import { judgeItems, instituteInfo, scoreInfo } from "@/composables/global/useStaticData";
import { averageOf } from "@/composables/global/useArrayUtils";
import { bayesianAverageOf } from "@/composables/global/useArrayUtils";
import { roundScore, enoughDataThreshold } from "@/composables/global/useParseScore"

export default {
  setup() {
    const { statics } = useCourseCard();
    return { statics, judgeItems, roundScore, enoughDataThreshold, instituteInfo, scoreInfo };
  },
  data() {
    return {
      roundedScore: new Array(),
      averageScore: 0
    };
  },
  props: {
    course: {
      type: Object, 
      required: true
    },
    width: {
      type: String, 
      default: ""
    }
  },
  components: {
    AvatarContainer,
  },
  created() {
    for (let score of this.course.score) {
      let rounded = roundScore(score, this.course["comment_num"]);
      this.roundedScore.push(rounded);
    }
    // Bayes statistics inference
    // averageScore = (C * m + Σ(ratings)) / (C + N)
    // As of 2024/06/25, 20:01, Prior Comments Count = 847
    // Since Prior Comments Count is too large, we just take Prior Comments Count as 2.
    // C: Prior Comments Count = 2
    // m: Prior Mean Rating = 3.853896103896104
    // N: Current Comments Count = this.course.score
    // By the way, we set a bar that the course must have at least 8 comments
    // and the raw average score at 5 to consider this course as a full score course. 
    this.averageScore = bayesianAverageOf(this.course.score, 3.853896103896104, 2, 8) * 20;
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