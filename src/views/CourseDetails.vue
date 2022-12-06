<template>
  <v-container class="d-flex justify-center mt-6 mt-sm-13">
    <v-row class="d-flex justify-center" style="max-width: 1300px">
      <v-col sm="11" cols="12" class="pa-sm-3 pa-0">
        <v-row class="d-flex justify-center">
          <v-col cols="11" class="px-0 mb-3">
            <DetailCard
              :details="courseDetail"
              :comments="commentText"
              v-if="!status.commentLoading && !status.detailLoading"
            />
            <DetailCardLoader v-else />
          </v-col>
          <v-col cols="11">
            <v-row>
              <v-col lg="3" cols="12" class="pt-0 pl-0 pr-lg-4 pr-0">
                <FilterBox
                  :style="adoptiveCardPosition"
                  v-if="!status.commentLoading && !status.detailLoading"
                />
                <FilterBoxLoader v-else />
              </v-col>
              <v-col lg="9" cols="12" class="pl-lg-5">
                <v-row>
                  <v-col
                    cols="12"
                    class="px-0 pt-0 pb-3"
                    v-if="
                      !status.commentLoading &&
                      !status.detailLoading &&
                      global.isLogin
                    "
                  >
                    <writing-box
                      :disable-writing="disableWriting"
                    ></writing-box>
                  </v-col>
                  <v-col
                    class="pr-0 pl-0 pr-0 py-0"
                    v-if="!status.commentLoading && !status.detailLoading"
                    v-for="(comment, index) in selectedComment"
                    :key="comment.id"
                    cols="12"
                  >
                    <CourseCommentCard :comment="comment"> </CourseCommentCard>
                  </v-col>
                  <v-col
                    class="pr-0 pl-0 pr-0 py-0"
                    v-if="status.commentLoading || status.detailLoading"
                    v-for="index in 2"
                    :key="index"
                    cols="12"
                  >
                    <CommentLoader height="290px" :max-width="null" />
                  </v-col>
                  <v-col
                    v-if="
                      selectedComment.length === 0 &&
                      !status.commentLoading &&
                      !status.detailLoading
                    "
                    class="d-flex justify-center"
                    cols="12"
                  >
                    <nothing class="pt-10" :text="'还没有评论...'"></nothing>
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
import FilterBox from "@/components/courses/FilterBox";
import WritingBox from "@/components/courses/WritingBox";
import Nothing from "@/components/global/Nothing";
import CommentLoader from "@/components/teachers/loader/CommentLoader";
import FilterBoxLoader from "@/components/teachers/loader/FilterBoxLoader";
import DetailCardLoader from "@/components/teachers/loader/DetailCardLoader";

export default {
  components: {
    Nothing,
    WritingBox,
    DetailCard,
    FilterBox,
    CourseCommentCard,
    CommentLoader,
    FilterBoxLoader,
    DetailCardLoader,
  },
  setup() {
    const {
      commentText,
      status,
      courseDetail,
      selectedTeachers,
      groups,
      global,
    } = useCourseDetails();
    return {
      commentText,
      status,
      courseDetail,
      selectedTeachers,
      groups,
      global,
    };
  },
  data() {
    return {
      currentTab: 0,
      scrollTop: document.documentElement.scrollTop,
      selectedComment: [],
      disableWriting: false,
    };
  },
  mounted() {
    document.addEventListener("scroll", () => {
      this.scrollTop = document.documentElement.scrollTop;
    });
  },
  methods: {
    updateSelectedComment() {
      let mappedGroup = this.selectedTeachers.map((item) => {
        return this.groups[item].id;
      });
      this.selectedComment = this.commentText.filter((item) => {
        return mappedGroup.includes(item.group.id);
      });
    },
  },
  watch: {
    selectedTeachers: {
      handler() {
        this.updateSelectedComment();
      },
      immediate: true,
      deep: true,
    },
    commentText: {
      handler() {
        this.updateSelectedComment();
        this.commentText.map((item) => {
          if (item.user) {
            if (item.user.id === this.global.userProfile.id) {
              this.disableWriting = true;
            }
          }
        });
      },
      immediate: true,
      deep: true,
    },
  },
  computed: {
    adoptiveCardPosition() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        return {};
      } else if (this.scrollTop <= 323) {
        return {
          transform: "translate(0, 0px)",
        };
      } else {
        return {
          transform: "translate(0, " + (this.scrollTop - 323) + "px)",
        };
      }
    },
  },
};
</script>
<style>
body {
  /* // ! Temporary fix, leave for future. */
  overflow-y: hidden;
}
</style>
