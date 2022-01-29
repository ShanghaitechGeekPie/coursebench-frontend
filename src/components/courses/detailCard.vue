<template>
  <v-card class="info-wrp rounded-t-xl" elevation="10" color="#d6fdde">
    <v-row>
      <v-col>
        <div class="white--text text-h5 font-weight-bold pt-8 pl-12"> CS100: 计算机编程 </div>
        <detail-chips class="my-1"></detail-chips>
        <review-detail class="my-2 mx-4"></review-detail>
        <div class="white--text text-caption font-weight-medium ml-12">
          开课单位：信息科学与技术学院
        </div>
        <div class="white--text text-caption font-weight-medium ml-12">
          先修课程: 无
        </div>
        <div class="white--text text-caption font-weight-medium ml-12">
          课程简介： The course provides an introduction to programming for starting undergraduate students. The course will be based on C and the object-oriented C++...
        </div>
      </v-col>
      <v-divider vertical inset class="my-6"> </v-divider>
      <v-col class="d-flex align-end">
        <v-row class="my-2">
          <v-spacer></v-spacer>
          <v-col>
            <score-board fontColor="orange" text="工作量" value="40"></score-board>
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
</template>

<script>
import scoreBoard from '@/components/courses/scoreBoard.vue';
import detailChips from "@/components/courses/detailChips";
import reviewDetail from "@/components/courses/reviewDetail";

export default {
  components: {
    'score-board': scoreBoard,
    'detail-chips': detailChips,
    'review-detail': reviewDetail
  }
}
</script>

<style scoped>
.info-wrp {
  height: 90%;
  width: 80%;
  background: linear-gradient(40deg, blue, pink);
  /*background: rgba(0, 206, 209, 0.34);*/
}
.type-chip {
}
</style>
