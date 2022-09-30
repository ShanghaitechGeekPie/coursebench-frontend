<template>
  <v-lazy>
    <v-card class="mb-3" flat max-width="800" outlined>
      <CommentCardBar :comment="comment">
        <template v-slot:headerAvatar="avatar">
          <div
              class="d-flex justify-space-between router-container"
              @click="$router.push({ path: `/user/${comment.user.id}` })"
          >
            <AvatarContainer
                :name="avatar.localComment.user ? avatar.localComment.user.nickname : '' "
                :src="avatar.localComment.user ? avatar.localComment.user.avatar : '' "
                small
                tile
                slice
                size="38"
            />
            <div class="pl-2">
              <div class="text-body-1 font-weight-bold overflow-ellipsis">
                {{ useUserName(avatar.localComment.user) }}
              </div>
              <div class="text-caption mt-n1 single-line-limit" >
                {{  avatar.localComment.user ? gradeItems[avatar.localComment.user.grade] : '由匿名用户发送，请仔细分辨其真实性' }}
              </div>
            </div>
          </div>
        </template>
      </CommentCardBar>
      <CommentCardContent :comment="comment">
        <template v-slot:footerNote="footerNote">

          <div class="d-flex justify-end" style="flex-wrap: wrap">
            <div class="mr-3">
              <v-icon size="15" style="">
                {{ footerNote.statics.icons.mdiClockOutline }}
              </v-icon>
              <span class="text-caption"> {{ footerNote.semester }} </span>
            </div>
            <v-btn class="like-button mr-1" small :color="formStatus.likeStatus === 1 ? 'primary' : 'primary'" elevation="0" :text="formStatus.likeStatus!==1" :outlined="formStatus.likeStatus!==1" @click="onClickLike">
              <div class="px-0">
                <v-icon size="30" style="">
                  {{ footerNote.statics.icons.mdiTriangleSmallUp }}
                </v-icon>
                <span class="text-caption" style="transform: translate(-7px, 0); display: inline-block;"> 赞同 {{ footerNote.comment.like - footerNote.comment.dislike + (formStatus.likeStatus === 1 ? 1 : 0) -  (formStatus.likeStatus === 2 ? 1 : 0) - (comment.like_status === 1 ? 1 : 0) +  (comment.like_status === 2 ? 1 : 0)}} </span>
              </div>
            </v-btn>
            <v-btn class="like-button mr-3" small :color="formStatus.likeStatus === 2 ? 'primary' : 'primary'" elevation="0" :text="formStatus.likeStatus!==2" :outlined="formStatus.likeStatus!==2" @click="onClickDislike" :min-width="''">
              <v-icon size="30" style="">
                {{ footerNote.statics.icons.mdiTriangleSmallDown }}
              </v-icon>
            </v-btn>
          </div>
        </template>
      </CommentCardContent>
    </v-card>
  </v-lazy>
</template>
<script>
import CommentCardContent from "@/components/users/comment/CommentCardContent";
import CommentCardBar from "@/components/users/comment/CommentCardBar";
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import useCourseCommentCard from "@/composables/courses/comment/useCourseCommentCard";
import useUserName from "@/composables/global/useUserName";
import {gradeItems} from "@/composables/global/useStaticData";

export default {
  props: {
    comment: Object,
  },
  components: {
    CommentCardContent,
    CommentCardBar,
    AvatarContainer
  },
  setup() {
    const { doLike, doDislike, doUndo, formStatus } = useCourseCommentCard()
    return { doLike, doDislike, doUndo, formStatus, useUserName, gradeItems}
  },
  mounted() {
    this.formStatus.likeStatus = this.comment.like_status
  },
  methods: {
    onClickLike() {
      if (this.formStatus.likeStatus === 1) {
        this.doUndo(this.comment.id)
      }
      else {
        this.doLike(this.comment.id)
      }
    },
    onClickDislike() {
      if (this.formStatus.likeStatus === 2) {
        this.doUndo(this.comment.id)
      }
      else {
        this.doDislike(this.comment.id)
      }
    }
  }
};
</script>
<style scoped>
.single-line-limit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.like-button {
  padding: 0 !important;
}
</style>
