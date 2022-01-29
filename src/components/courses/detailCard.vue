<template>
  <v-scroll-y-transition>
    <v-card class="info-wrp rounded-t-xl" elevation="10" color="#d6fdde">
      <v-row class="pb-4">
        <v-col sm="6" cols="12">
          <div class="white--text text-h5 font-weight-bold pt-8 ml-sm-12 ml-8"> CS100: 计算机编程 </div>
          <detail-chips class="my-1 ml-sm-12 ml-9"></detail-chips>
          <review-detail class="my-2 mx-4"></review-detail>
          <div class="white--text text-caption font-weight-medium ml-sm-12 ml-7">
            开课单位：信息科学与技术学院
          </div>
          <div class="white--text text-caption font-weight-medium ml-sm-12 ml-7">
            先修课程: 无
          </div>
          <div class="white--text text-caption font-weight-medium ml-sm-12 ml-7">
            英文名：Introduction to Programming
          </div>
          <div class="white--text text-caption font-weight-medium ml-sm-12 ml-7">
            学历层次：本科
          </div>
        </v-col>
        <v-divider vertical inset class="my-6 d-none d-sm-block"> </v-divider>
        <v-col class="d-flex flex-column my-auto" sm="6" cols="12">
          <teacher-select class="pt-sm-10 pt-0"></teacher-select>
          <v-row class="my-2">
            <v-spacer></v-spacer>
            <v-col>
              <score-board fontColor="darkorange" text="工作量" value="40"></score-board>
            </v-col>
            <v-col>
              <score-board fontColor="pink" text="内容质量" value="93"></score-board>
            </v-col>
            <v-col>
              <score-board fontColor="#6dbe71" text="推荐指数" value="74"></score-board>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
import scoreBoard from '@/components/courses/scoreBoard.vue';
import detailChips from "@/components/courses/detailChips";
import reviewDetail from "@/components/courses/reviewDetail";
import teacherSelect from "./teacherSelect";

export default {
  components: {
    'score-board': scoreBoard,
    'detail-chips': detailChips,
    'review-detail': reviewDetail,
    'teacher-select': teacherSelect,
  },
  data() {
    return {
    }
  },
  watch: {
    model() {
      console.log(this.model)
    }
  }
}
</script>

<style scoped>
.info-wrp {
  max-width: 800px;
  height: 90%;
  width: 90%;
  background: linear-gradient(70deg, blue, lightcoral);
  /*background: rgba(0, 206, 209, 0.34);*/
}
.type-chip {
}
</style>
