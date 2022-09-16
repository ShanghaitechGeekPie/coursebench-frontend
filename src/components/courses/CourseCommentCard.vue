<template>
  <v-lazy>
    <v-card class="mb-3" flat max-width="800" outlined>
      <CommentCardBar :comment="comment">
        <template v-slot:headerAvatar="avatar">
          <div
              class="d-flex justify-space-between router-container"
              @click="$router.push({ path: `/user/${comment.user_id}` })"
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
              <div class="text-caption mt-n1">
                {{  avatar.localComment.user ? gradeItems[avatar.localComment.user.grade] : '用户信息由于隐私设置不可见' }}
              </div>
              <div class="text-body-1 font-weight-bold overflow-ellipsis">
                {{ useUserName(avatar.localComment.user) }}
              </div>
            </div>
          </div>
        </template>
      </CommentCardBar>
      <CommentCardContent :comment="comment" />
    </v-card>
  </v-lazy>
</template>
<script>
import CommentCardContent from "@/components/users/comment/CommentCardContent";
import CommentCardBar from "@/components/users/comment/CommentCardBar";
import {gradeItems} from "@/composables/global/useStaticData";
import useUserName from "@/composables/global/useUserName";
import AvatarContainer from "@/components/users/profile/AvatarContainer";

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
    return { gradeItems, useUserName }
  }
};
</script>