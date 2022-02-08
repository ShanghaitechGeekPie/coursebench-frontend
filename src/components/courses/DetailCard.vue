<template>
  <v-scroll-y-transition>
    <v-card class="info-wrp rounded-b-0" :class="screen" color="#11638B" elevation="10" v-show="isShow" max-width="800px">
      <v-row class="pb-1">
        <v-col class="px-0" sm="6" cols="12">
          <div class="white--text text-h5 font-weight-bold pt-8 ml-sm-12 ml-8">CS100: 计算机编程</div>
          <DetailChips class="my-1 ml-sm-12 ml-9" />
          <ReviewDetail class="my-2 mx-4" />
          <div class="white--text text-caption font-weight-medium ml-sm-12 ml-7">开课单位：信息科学与技术学院</div>
          <div class="white--text text-caption font-weight-medium ml-sm-12 ml-7">先修课程: 无</div>
          <div
            class="white--text text-caption font-weight-medium ml-sm-12 ml-7"
          >英文名：Introduction to Programming</div>
          <div class="white--text text-caption font-weight-medium ml-sm-12 ml-7">学历层次：本科</div>
        </v-col>
        <v-divider vertical inset class="my-6 d-none d-sm-block"></v-divider>
        <v-col class="d-flex flex-column my-auto px-0" sm="6" cols="12">
          <TeacherSelect class="pt-sm-10 pt-0" />
          <v-row class="my-2">
            <v-spacer></v-spacer>
            <v-col>
              <ScoreBoard fontColor="#D4E157" text="工作量" value="40" />
            </v-col>
            <v-col>
              <ScoreBoard fontColor="pink" text="内容质量" value="93" />
            </v-col>
            <v-col>
              <ScoreBoard fontColor="#00E676" text="推荐指数" value="74" />
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-scroll-y-transition>
</template>

<script>
import ScoreBoard from '@/components/courses/ScoreBoard.vue';
import DetailChips from "@/components/courses/DetailChips";
import ReviewDetail from "@/components/courses/ReviewDetail";
import TeacherSelect from "@/components/courses/TeacherSelect";

export default {
  name: "DetailCard",
  components: { ScoreBoard, DetailChips, ReviewDetail, TeacherSelect },
  computed: {
    screen() {
      if (this.$vuetify.breakpoint.width >= 600) {
        return 'rounded-t-xl';
      } else {
        return '';
      }
    },
  },
  data() {
    return {
      isShow: false,
    }
  },
  watch: {
    model() {
      console.log(this.model)
    }
  },
  mounted() {
    setTimeout(()=>{
      this.isShow = true;
    }, 300);
  }
}
</script>

<style scoped>
.info-wrp {
  /*background: linear-gradient(70deg, blue, lightcyan);*/
}
</style>
