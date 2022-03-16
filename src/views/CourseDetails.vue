<template>
  <div>
    <div class="upper-wrp d-flex justify-center align-end">
      <DetailCard class="mt-sm-10 pb-sm-8 pt-sm-2" />
    </div>
    <div>
      <v-tabs centered v-model="currentTab">
        <v-tab v-for='(teacher, index) in teachers' :key="index">{{teacher.name}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab"  class="transparent d-flex align-center justify-center">
        <v-tab-item v-for="(item, index) in teachers" :key="index">
          <CommentBoard :currentTab="teachers[currentTab]"></CommentBoard>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import DetailCard from '@/components/courses/DetailCard.vue';
import CommentBoard from "@/components/courses/CommentBoard";
import useCourseDetails from "@/composables/courses/comment/useCourseDetails";


export default {
  setup() {
    const { teachers } = useCourseDetails();
    return { teachers };
  },
  components: {
    DetailCard,
    CommentBoard,
  },
  data() {
    return {
      currentTab: 0,
    }
  }
}
</script>

<style scoped>
.upper-wrp {
  width: 100%;
  background: rgba(242, 243, 247, 0.8);
}
</style>
