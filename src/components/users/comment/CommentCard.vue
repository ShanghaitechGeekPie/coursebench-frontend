<template>
  <v-lazy>
    <v-card class="mb-3" flat max-width="800" outlined>
      <CommentCardBar :comment="comment" />
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
        <template v-slot:footerNote v-if='$route.path === "/Recent" && (global.userProfile.is_admin || global.userProfile.is_community_admin)'>
          <div class="d-flex justify-end" style="flex-wrap: wrap">
            <div class="d-flex">
              <v-btn
                class="fold-button mr-1"
                small
                :color="commentFoldStatus.foldStatus ? 'primary' : 'primary'"
                elevation="0"
                :text="!commentFoldStatus.foldStatus"
                :outlined="!commentFoldStatus.foldStatus"
                @click="onClickFold"
                :disabled="!global.isLogin"
              >
                <div class="px-0">
                  <span
                    class="text-caption"
                  >
                    折叠
                  </span>
                </div>
              </v-btn>
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
import { inject, ref } from 'vue';
import { mdiSchoolOutline } from '@mdi/js';
import useFoldComment from '@/composables/courses/comment/useFoldComment';

export default {
  setup() {
    const { doFold, doUnfold, commentFoldStatus } =
      useFoldComment();
    const global = inject("global")
    const foldComment = ref(true);
    const statics = {
      icons: {
        mdiSchoolOutline,
      },
    };
    return { foldComment, statics, global, doFold, doUnfold, commentFoldStatus };
  },
  props: {
    comment: Object,
  },
  components: {
    CommentCardContent,
    CommentCardBar,
    CommentFold,
  },
  mounted() {
    this.commentFoldStatus.foldStatus = this.comment.is_fold;
  },
  methods: {
    onClickFold() {
      if (this.commentFoldStatus.foldStatus === true) {
        this.doUnfold(this.comment.id);
      } else {
        this.doFold(this.comment.id);
      }
    },
  },
};
</script>
<style>
.fold-button {
  padding: 0 !important;;
}
</style>
