<template>
    <div class="d-flex justify-center">
      <v-row class="d-flex justify-center mx-10" style="max-width: 1150px;">
        <v-col cols="3" class="mt-3">
          <TeacherSelect class=""/>
        </v-col>
        <v-col cols="8" class="">
          <v-row class="" >
            <v-col cols="12" class="px-0">
              <DetailCard class="mt-sm-10 pb-sm-8 pt-sm-2" :details="courseDetail" :comments="commentText"/>
            </v-col>
            <v-col cols="12" class="px-0 pt-0 pb-1">
              <writing-box></writing-box>
            </v-col>
            <v-col class="pr-0 pl-0 pr-0 py-0" v-for="(comment, index) in commentText" :key="comment.id"
                   cols="12"
            >
              <CourseCommentCard
                  :comment="comment"
                  :showType="'course'"
              >
              </CourseCommentCard>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
</template>

<script>
import DetailCard from "@/components/courses/DetailCard"
import useCourseDetails from "@/composables/courses/comment/useCourseDetails"
import CourseCommentCard from "@/components/courses/CourseCommentCard";
import TeacherSelect from "@/components/courses/FilterBox"
import WritingBox from "@/components/courses/WritingBox";

export default {
  components: {WritingBox, DetailCard, TeacherSelect, CourseCommentCard},
  setup() {
    const { commentText, status, courseDetail } = useCourseDetails()
    return { commentText, status, courseDetail }
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
</style>
