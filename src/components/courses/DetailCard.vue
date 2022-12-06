<template>
  <v-scroll-y-transition>
    <v-card class="ma-0" elevation="0" outlined>
      <v-row class="pb-0">
        <v-col
          class="px-0 pl-sm-12 pl-8 pt-0"
          sm="6"
          cols="12"
          v-if="details.name"
        >
          <div
            class="text-h6 pt-6 single-line-limit pr-3"
            style="font-weight: bold"
          >
            {{ details.name }}
          </div>
          <div>
            <span
              class="subtitle-2 font-weight-regular"
              :class="
                $vuetify.theme.isDark
                  ? 'grey--text'
                  : 'grey--text text--darken-3'
              "
            >
              {{ details.code }}
              | {{ details.credit }}学分 | {{ details.comment_num }}评论
            </span>
          </div>
          <!--          <div class="white&#45;&#45;text subtitle-1 font-weight-bold ml-sm-12 ml-7 pt-3"> 开课单位: {{ details.institute }} </div>-->
          <div class="pt-3">
            <div
              class="subtitle-1 font-weight-regular"
              :class="
                $vuetify.theme.isDark
                  ? 'grey--text text--lighten-1'
                  : 'grey--text text--darken-3'
              "
            >
              开课单位:
            </div>
            <div
              class="text-caption font-weight-regular"
              :class="
                $vuetify.theme.isDark
                  ? 'grey--text text--lighten-1'
                  : 'grey--text text--darken-3'
              "
            >
              {{ details.institute }}
            </div>
          </div>
          <div class="pt-3">
            <div
              class="subtitle-1 font-weight-regular"
              :class="
                $vuetify.theme.isDark
                  ? 'grey--text text--lighten-2'
                  : 'grey--text text--darken-3'
              "
            >
              授课老师:
            </div>
            <div
              class="text-caption font-weight-regular"
              style="cursor: pointer"
            >
              <span
                v-for="(teacher, index) in teachers"
                :key="index"
                @click="$router.push({ path: `/teacher/${teacher.id}` })"
                :class="
                  $vuetify.theme.isDark
                    ? 'grey--text text--lighten-1'
                    : 'grey--text text--darken-3'
                "
              >
                {{ teacher.name }}
              </span>
            </div>
          </div>
        </v-col>
        <v-col v-else sm="6" cols="12">
          <v-skeleton-loader
            type="article"
            :boilerplate="true"
          ></v-skeleton-loader>
        </v-col>
        <v-divider vertical inset class="my-6 d-none d-sm-block"></v-divider>
        <v-col class="mt-lg-6 px-0 pb-0" sm="6" cols="12">
          <div class="ml-6">
            <div class="subtitle-1 font-weight-bold">Ratings & Reviews</div>
            <div style="font-family: Arial, serif">
              <span v-if="details.comment_num >= enoughDataThreshold">
                <span
                  class="text-h3 font-weight-bold"
                  style="font-family: Arial, serif !important"
                >
                  {{ Math.floor(averageScore / 20) }}
                </span>
                <span
                  class="font-weight-bold text-h5"
                  style="
                    transform: translate(-10px, 0px);
                    display: inline-block;
                  "
                >
                  .{{ parseInt(averageScore / 2) % 10 }}
                </span>
              </span>
              <span v-else>
                <span
                  class="text-h3 font-weight-bold"
                  style="font-family: Arial, serif !important"
                >
                  -
                </span>
              </span>
              <span
                class="font-weight-bold text-h5"
                style="transform: translate(-3px, 0px); display: inline-block"
              >
                /5
              </span>

              <!--              <span-->
              <!--                  class="grey&#45;&#45;text lighten- font-weight-bold subtitle-1"-->
              <!--                  style="display: inline-block;"-->
              <!--              >-->
              <!--                数据不足-->
              <!--              </span>-->
            </div>
            <ScoreBoard
              class="mb-4 pr-3"
              :starPercent="toDistribute(starStatistic)"
            ></ScoreBoard>
            <v-row no-gutters>
              <v-col
                class="d-flex"
                v-for="index in [0, 1, 2, 3]"
                :key="index"
                cols="6"
              >
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
                    <span class="text-caption white--text">
                      {{ scoreInfo[roundedScore[index]].label }}</span
                    >
                  </v-chip>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
import ScoreBoard from "@/components/courses/ScoreBoard";
import DetailChips from "@/components/courses/DetailChips";
import ReviewDetail from "@/components/courses/ReviewDetail";
import useDetailCard from "@/composables/courses/comment/useDetailCard";
import { judgeItems, scoreInfo } from "@/composables/global/useStaticData";
import {
  roundScore,
  enoughDataThreshold,
} from "@/composables/global/useParseScore";
import { averageOf, toDistribute } from "@/composables/global/useArrayUtils";

export default {
  name: "DetailCard",
  components: { ScoreBoard, DetailChips, ReviewDetail },
  props: {
    details: Object,
    comments: Array,
  },
  setup() {
    const { teachers, statics } = useDetailCard();
    return {
      teachers,
      statics,
      judgeItems,
      scoreInfo,
      toDistribute,
      enoughDataThreshold,
    };
  },
  data() {
    return {
      averageScore: 0,
      roundedScore: [0, 0, 0, 0],
      starStatistic: [0, 0, 0, 0, 0],
    };
  },
  computed: {},
  methods: {
    getStatistic() {
      this.roundedScore = [];
      for (let score of this.details.score) {
        let rounded = roundScore(score, this.details["comment_num"]);
        this.roundedScore.push(rounded);
      }
      if (this.details.comment_num !== 0) {
        this.averageScore = averageOf(this.details.score) * 20;

        this.starStatistic = [0, 0, 0, 0, 0];
        for (let comment of this.comments) {
          this.starStatistic[Math.round(averageOf(comment.score)) - 1] += 1;
        }
      }
    },
  },
  watch: {
    details: {
      handler() {
        this.getStatistic();
      },
      immediate: true,
    },
    comments: {
      handler() {
        this.getStatistic();
      },
      immediate: true,
    },
  },
  mounted() {},
};
</script>

<style scoped>
.single-line-limit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
