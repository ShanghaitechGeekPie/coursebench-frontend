<template>
  <v-scroll-y-transition>
    <v-card
        class="info-wrp rounded-b-0"
        :class="screen"
        color="#11638B"
        elevation="0"
        outlined
        v-show="isShow"
        width="800px"
    >
      <v-row class="pb-0">
        <v-col class="px-0" sm="6" cols="12">
          <div class="white--text text-h5 font-weight-bold pt-6 ml-sm-12 ml-8 single-line-limit pr-3">{{
              details.name
            }}
          </div>
          <div class="white--text ml-sm-12 ml-8">
            <span class="subtitle-2 font-weight-bold">
              {{ details.code }}
              | {{ details.credit }}学分
              | {{ details.comment_num }}评论
            </span>
          </div>
          <!--          <div class="white&#45;&#45;text subtitle-1 font-weight-bold ml-sm-12 ml-7 pt-3"> 开课单位: {{ details.institute }} </div>-->
          <div class="pt-3">
            <div class="white--text subtitle-1 font-weight-bold ml-sm-12 ml-7 ">
              开课单位:
            </div>
            <div class="white--text text-caption font-weight-bold ml-sm-12 ml-7 ">
              {{ details.institute }}
            </div>
          </div>
          <div>
            <div class="white--text subtitle-1 font-weight-bold ml-sm-12 ml-7 ">
              授课老师:
            </div>
            <div class="white--text text-caption font-weight-bold ml-sm-12 ml-7 ">
                    <span
                        v-for="(teacher, index) in teachers"
                        :key="index"
                        @click="$router.push({ path: `/teacher/${teacher.id}` })"
                    >
                      {{ teacher.name }}
                    </span>
            </div>
          </div>
        </v-col>
        <v-divider vertical inset class="my-6 d-none d-sm-block"></v-divider>
        <v-col class="mt-lg-6 px-0" sm="6" cols="12">
          <div class="ml-6">
            <div
                class="subtitle-1 white--text font-weight-bold"
            >
              Ratings & Reviews
            </div>
            <div style="font-family: Arial,serif">
              <span
                  class="text-h3 white--text font-weight-bold"
                  style="font-family: Arial,serif!important;"
              >
                4.2
              </span>
              <span
                  class="white--text font-weight-bold"
              >
              /5
              </span>
            </div>
            <ScoreBoard class="mb-4"></ScoreBoard>
            <v-row no-gutters>
              <v-col class="d-flex" v-for="index in [0, 1, 2, 3]" :key="index" cols="6">
                <div
                    class="text-body-2 pr-2 font-weight-bold white--text"
                    style="min-width: 57px"
                >
                  {{ judgeItems[index] }}
                </div>
                <div>
                  <v-chip
                      x-small
                      label
                      :color="scoreInfo[index].color"
                      class="px-1 mt-n2"
                  >
                        <span class="text-caption white--text">{{
                            scoreInfo[index].label
                          }}</span>
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
import ScoreBoard from "@/components/courses/ScoreBoard"
import DetailChips from "@/components/courses/DetailChips"
import ReviewDetail from "@/components/courses/ReviewDetail"
import useDetailCard from "@/composables/courses/comment/useDetailCard";
import {judgeItems, scoreInfo} from "@/composables/global/useStaticData";

export default {
  name: "DetailCard",
  components: {ScoreBoard, DetailChips, ReviewDetail},
  props: {
    details: Object
  },
  setup() {
    const { teachers, statics } = useDetailCard()
    return { teachers, statics, judgeItems, scoreInfo }
  },
  computed: {
    screen() {
      if (this.$vuetify.breakpoint.width >= 650) {
        return "rounded-t-xl"
      } else {
        return ""
      }
    }
  },
  data() {
    return {
      isShow: true
    }
  },
  watch: {
    model() {
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.info-wrp {
  /*background: linear-gradient(70deg, blue, lightcyan);*/
}

.single-line-limit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
