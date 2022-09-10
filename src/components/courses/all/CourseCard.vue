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
              :color="statics.backgroundColor[course.institute]"
            ></v-sheet>
            <v-container>
              <v-row class="d-flex justify-space-between">
                <v-col class="d-flex justify-space-between">
                  <div class="pl-2">
                    <div class="d-flex">
                      <div class="pr-4">
                        <v-icon
                          size="40"
                          :color="statics.backgroundColor[course.institute]"
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
                        :color="statics.scoreColor[roundedScore[index]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[roundedScore[index]]
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
                        :color="statics.scoreColor[roundedScore[index]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[roundedScore[index]]
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
                  <div v-else>
                    数据不足
                  </div>
                </div>            
              </div>
              <div>
                <div style="width: 100%" class="px-5">
                  <v-progress-linear
                    v-model="averageScore"
                    :color="statics.scoreColor[roundScore(averageScore / 20, course['comment_num'])]"
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
import { judgeItems } from "@/composables/global/useStaticData";
import { averageOf } from "@/composables/global/useArrayUtils";
import { roundScore, enoughDataThreshold } from "@/composables/global/useParseScore"

export default {
  setup() {
    const { statics } = useCourseCard();
    return { statics, judgeItems, roundScore, enoughDataThreshold };
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
    this.averageScore = averageOf(this.course.score) * 20;
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