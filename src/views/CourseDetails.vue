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
        <v-col cols="8" class="mt-6">
          <v-row class="">
            <v-col class="pr-0 pl-0 pr-0 py-0" v-for="(comment, index) in commentText" :key="comment.id"
                   cols="12">
              <CommentCard
                  :comment="comment"
                  :showType="'course'"
              >
                <template v-slot:headerAvatar="avatar">
                  <div
                    class="d-flex justify-space-between router-container"
                    @click="$router.push({ path: `/user/${comment.user_id}` })"
                  >
                    <AvatarContainer
                      :name="avatar.localComment.localComment.user.nickname"
                      :src="avatar.localComment.localComment.user.avatar"
                      small
                      tile
                      size="38"
                    />
                    <div class="pl-2">
                      <div class="text-caption mt-n1">
                        {{ gradeItems[avatar.localComment.localComment.user.grade] }}
                      </div>
                      <div class="text-body-1 font-weight-bold overflow-ellipsis">
                        {{ useUserName(avatar.localComment.localComment.user) }}
                      </div>
                    </div>
                  </div>
                </template>
              </CommentCard>
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
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import CommentCard from "@/components/users/comment/CommentCard";
import TeacherSelect from "@/components/courses/FilterBox"
import {gradeItems} from "@/composables/global/useStaticData";
import useUserName from "@/composables/global/useUserName";

export default {
  components: {DetailCard, CommentCard, TeacherSelect, AvatarContainer},
  setup() {
    const {teachers, commentText, status, courseDetail } = useCourseDetails()
    return {teachers, commentText, status, courseDetail, gradeItems, useUserName }
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
