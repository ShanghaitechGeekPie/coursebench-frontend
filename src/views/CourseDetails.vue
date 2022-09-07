<template>
  <div style="overflow: hidden">
    <div class="upper-wrp d-flex justify-center align-end">
      <DetailCard class="mt-sm-10 pb-sm-8 pt-sm-2" />
    </div>
    <div class="d-flex justify-center">
      <v-card>
        Teachers
      </v-card>
      <v-row class="">
        <v-col class="pl-sm-0 pr-0 pl-0 pr-0 mt-3" v-for="(comment, index) in commentText" :key="comment.id" cols="12">
              <CommentCard
                  :comment="comment"
                  :showType="'course'"
                  v-if="
                      status.selected.some(
                        (school) => school === comment.course.institute
                      )
                    "
              />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import DetailCard from "@/components/courses/DetailCard"
import CommentBoard from "@/components/courses/CommentBoard"
import useCourseDetails from "@/composables/courses/comment/useCourseDetails"

import CommentCard from "@/components/users/comment/CommentCard";
import useUser from "@/composables/users/useUser";

export default {
  components: { DetailCard, CommentBoard, CommentCard},
  setup() {
    const { teachers, comments } = useCourseDetails()
    const { commentText, status } = useUser();
    return { teachers, comments, commentText, status}
  },
  data() {
    return {
      currentTab: 0
    }
  },
  computed: {
    alignedComment() {
      let result = new Array(this.teachers.length)
      let reverseMap = {}
      for (let i = 0; i < result.length; ++i) {
        result[i] = []
        if (i > 0) {
          reverseMap[this.teachers[i].id] = i
        }
      }
      result[0] = this.comments
      this.comments.forEach((value) => {
        for (const x of value.group.teachers) {
          result[reverseMap[x.id]].push(value)
        }
      })
      return result
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
