<template>
  <v-container class="d-flex justify-center mt-16">
    <v-row class="d-flex justify-center mx-10" style="max-width: 1150px">      
      <v-col cols="11" class="">
        <v-row class="d-flex justify-center">
          <v-col cols="11" class="px-0">
            <DetailCard
              class="pb-8 pt-2"
              :details="courseDetail"
              :comments="commentText"
            />
          </v-col>
          <v-col cols="11">
            <v-row>
              <v-col cols="3" class="pt-0 pl-0"  >
                <TeacherSelect class="" :style="adoptiveCardPosition"/>
              </v-col>
              <v-col cols="9">
                <v-row>
                  <v-col cols="12" class="px-0 pt-0 pb-1">
                    <writing-box></writing-box>
                  </v-col>
                  <v-col
                      class="pr-0 pl-0 pr-0 py-0"
                      v-for="(comment, index) in commentText"
                      :key="comment.id"
                      cols="12"
                  >
                    <CourseCommentCard :comment="comment" :showType="'course'">
                    </CourseCommentCard>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DetailCard from "@/components/courses/DetailCard";
import useCourseDetails from "@/composables/courses/comment/useCourseDetails";
import CourseCommentCard from "@/components/courses/CourseCommentCard";
import TeacherSelect from "@/components/courses/FilterBox";
import WritingBox from "@/components/courses/WritingBox";

export default {
  components: { WritingBox, DetailCard, TeacherSelect, CourseCommentCard },
  setup() {
    const { commentText, status, courseDetail } = useCourseDetails();
    return { commentText, status, courseDetail };
  },
  data() {
    return {
      currentTab: 0,
      scrollTop: document.documentElement.scrollTop,
    };
  },
  mounted() {
    document.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
  computed: {
    adoptiveCardPosition() {
      console.log(this.scrollTop)
      if (this.$vuetify.breakpoint.mdAndDown) {
        return {};
      } else if (this.scrollTop <= 323) {
        return {
          transform: "translate(0, 0px)",
        };
      } else {
        return {
          transform: "translate(0, " + (this.scrollTop - 323)+ "px)",
        };
      }
    }
  }
};
</script>

<style scoped>
</style>
