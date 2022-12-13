<template>
  <v-lazy>
    <v-card class="mb-3" flat outlined>
      <CommentCardBar :comment="comment">
        <template v-slot:headerAvatar="{ localComment }">
          <div
            class="d-flex justify-space-between router-container"
            style="cursor: pointer"
            @click="
              comment.user
                ? $router.push({ path: `/user/${comment.user.id}` })
                : null
            "
          >
            <AvatarContainer
              :name="localComment.user ? useUserName(localComment.user) : '?'"
              :src="localComment.user ? localComment.user.avatar : ''"
              small
              tile
              slice
              size="38"
            />
            <div class="pl-2">
              <div class="text-body-1 font-weight-bold overflow-ellipsis">
                {{
                  useUserName(localComment.user) +
                  (localComment.user && localComment.is_anonymous
                    ? '(匿名)'
                    : '')
                }}
              </div>
              <div class="text-caption mt-n1 single-line-limit">
                {{
                  localComment.user
                    ? gradeItems[localComment.user.grade]
                    : '由匿名用户发送，请仔细分辨其真实性'
                }}
              </div>
            </div>
          </div>
        </template>
      </CommentCardBar>
      <CommentCardContent :comment="comment">
        <template #title v-if="comment.is_fold && foldComment">
          <div></div>
        </template>
        <template #content v-if="comment.is_fold && foldComment">
          <div class="px-sm-4 px-2 pb-2 pt-2">
            <CommentFold @click="foldComment = false" />
            <v-row>
              <v-col class="pa-0 pl-3 pb-2 pt-sm-8 pt-2" cols="12">
                <v-icon size="16">
                  {{ statics.icons.mdiSchoolOutline }}
                </v-icon>
                <span
                  v-for="(teacher, index) in comment.group.teachers"
                  class="pl-1 router-container text-caption font-weight-bold"
                  :key="index"
                  @click="$router.push({ path: `/teacher/${teacher.id}` })"
                >
                  {{ teacher.name }}
                </span>
              </v-col>
            </v-row>
          </div>
        </template>
        <template v-slot:footerNote="footerNote">
          <div class="d-flex justify-end" style="flex-wrap: wrap">
            <div class="d-flex">
              <v-btn
                class="like-button mr-1"
                small
                :color="formStatus.likeStatus === 1 ? 'primary' : 'primary'"
                elevation="0"
                :text="formStatus.likeStatus !== 1"
                :outlined="formStatus.likeStatus !== 1"
                @click="onClickLike"
                :disabled="!global.isLogin"
              >
                <div class="px-0">
                  <v-icon size="30" style="">
                    {{ footerNote.statics.icons.mdiTriangleSmallUp }}
                  </v-icon>
                  <span
                    class="text-caption"
                    style="transform: translate(-7px, 0); display: inline-block"
                  >
                    赞同
                    {{
                      footerNote.comment.like -
                      footerNote.comment.dislike +
                      (formStatus.likeStatus === 1 ? 1 : 0) -
                      (formStatus.likeStatus === 2 ? 1 : 0) -
                      (comment.like_status === 1 ? 1 : 0) +
                      (comment.like_status === 2 ? 1 : 0)
                    }}
                  </span>
                </div>
              </v-btn>
              <v-btn
                class="like-button mr-n1 mr-sm-3"
                small
                :color="formStatus.likeStatus === 2 ? 'primary' : 'primary'"
                elevation="0"
                :text="formStatus.likeStatus !== 2"
                :outlined="formStatus.likeStatus !== 2"
                @click="onClickDislike"
                :min-width="30"
                :disabled="!global.isLogin"
              >
                <v-icon size="30" style="">
                  {{ footerNote.statics.icons.mdiTriangleSmallDown }}
                </v-icon>
              </v-btn>
            </div>
            <div class="mr-sm-1">
              <v-icon size="15" style="">
                {{ footerNote.statics.icons.mdiClockOutline }}
              </v-icon>
              <span class="text-caption"> {{ footerNote.semester }} </span>
            </div>
          </div>
        </template>
      </CommentCardContent>
    </v-card>
  </v-lazy>
</template>
<script>
import CommentCardContent from '@/components/users/comment/CommentCardContent';
import CommentCardBar from '@/components/users/comment/CommentCardBar';
import CommentFold from '@/components/users/comment/CommentFold';
import AvatarContainer from '@/components/users/profile/AvatarContainer';
import useCourseCommentCard from '@/composables/courses/comment/useCourseCommentCard';
import useUserName from '@/composables/global/useUserName';
import { gradeItems } from '@/composables/global/useStaticData';
import { inject, ref } from 'vue';

export default {
  props: {
    comment: Object,
  },
  components: {
    CommentCardContent,
    CommentCardBar,
    AvatarContainer,
    CommentFold,
  },
  setup() {
    const { doLike, doDislike, doUndo, formStatus, statics } =
      useCourseCommentCard();
    const global = inject('global');

    const foldComment = ref(true);

    return {
      foldComment,
      doLike,
      doDislike,
      doUndo,
      formStatus,
      useUserName,
      gradeItems,
      global,
      statics,
    };
  },
  mounted() {
    this.formStatus.likeStatus = this.comment.like_status;
  },
  methods: {
    onClickLike() {
      if (this.formStatus.likeStatus === 1) {
        this.doUndo(this.comment.id);
      } else {
        this.doLike(this.comment.id);
      }
    },
    onClickDislike() {
      if (this.formStatus.likeStatus === 2) {
        this.doUndo(this.comment.id);
      } else {
        this.doDislike(this.comment.id);
      }
    },
  },
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
