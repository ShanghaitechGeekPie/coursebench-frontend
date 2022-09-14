<template>
  <div class="" style="overflow: hidden;">
    <div class="upper-wrp d-flex justify-center align-end">
      <DetailCard class="mt-sm-10 pb-sm-8 pt-sm-2" :details="courseDetail" />
    </div>
    <div class="d-flex justify-center">
      <v-row class="d-flex justify-center mx-10" style="max-width: 1150px;">
        <v-col cols="3" class="mt-3">
          <TeacherSelect class=""/>
        </v-col>
        <v-col cols="8" class="">
          <v-row class="">
            <v-col class="pr-0 pl-0 pr-0 mt-3" v-for="(comment, index) in commentText" :key="comment.id"
                   cols="12">
              <CommentCard
                  :comment="comment"
                  :showType="'course'"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script>
import DetailCard from "@/components/courses/DetailCard"
import useCourseDetails from "@/composables/courses/comment/useCourseDetails"

import CommentCard from "@/components/users/comment/CommentCard";
import TeacherSelect from "@/components/courses/FilterBox"

export default {
  components: {DetailCard, CommentCard, TeacherSelect},
  setup() {
    const {teachers, commentText, status, courseDetail } = useCourseDetails()
    return {teachers, commentText, status, courseDetail }
  },
  data() {
    return {
      currentTab: 0
    }
  },
  computed: {},
  mounted() {
  }
}
</script>

<style scoped>
.upper-wrp {
  width: 100%;
  background: rgba(242, 243, 247, 0.8);
}
</style>
