<template>
  <v-lazy class="px-3">
    <div :style="{ width: adoptiveCardWidth }">
      <v-card class="mb-3" flat height="303" outlined>
        <v-container>
          <v-row class="d-flex justify-space-between">
            <v-col class="d-flex justify-space-between">
              <div style="transform: translate(8px, 0)">
                <AvatarContainer
                  :name="statics.short[course.institute]"
                  :color="statics.background[course.institute]"
                  font-size="text-body-1"
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
                      {{ statics.icons.mdiSchool }}
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
              <div v-for="index in judgeItems.length" :key="index">
                <div
                  :class="[
                    'd-flex',
                    'justify-space-between',
                    'px-2',
                    index !== 1 ? 'py-3' : 'pb-3',
                  ]"
                >
                  <div class="text-body-2" style="min-width: 57px">
                    {{ judgeItems[index - 1] }}
                  </div>
                  <div style="width: 64%" class="px-0 px-sm-1 px-md-0">
                    <v-progress-linear
                      v-model="course.score[index - 1] * 20"
                      :color="statics.color[roundedScore[index - 1]]"
                      class="mt-2"
                      style="pointer-events: none"
                    >
                    </v-progress-linear>
                  </div>
                  <div>
                    <v-chip
                      x-small
                      label
                      :color="statics.color[roundedScore[index - 1]]"
                      class="px-1 mt-n2"
                    >
                      <span class="text-caption white--text">{{
                        statics.label[roundedScore[index - 1]]
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
import { judgeItems } from "@/composables/global/useStaticData";
import Config from "Config"

export default {
  setup() {
    const { statics } = useCourseCard();
    return { statics, judgeItems, Config };
  },
  data() {
    return {
      roundedScore: new Array(),
    };
  },
  props: {
    course: Object,
  },
  components: {
    AvatarContainer,
  },
  created() {
    for (let score of this.course.score) {
      let rounded = this.roundScore(score);
      this.roundedScore.push(rounded);
    }
  },
  computed: {
    adoptiveCardWidth() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        if (this.$vuetify.breakpoint.xsOnly) {
          return "calc(100vw - 24px)";
        } else if (404 * 2 > this.$vuetify.breakpoint.width) {
          return "300px";
        } else {
          return "404px";
        }
      } else {
        return "404px";
      }
    },
  },
  methods: {
    roundScore(score) {
      if (score == 0) {
        if (this.course["comment_num"] < this.Config.enoughDataThreshold) {
          return 0; // 0 = no enough data
        } else {
          return 7; // 7 = extremely bad
        }
      } else {
        return Math.floor(score) + 1
      }
    }
  }  
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
