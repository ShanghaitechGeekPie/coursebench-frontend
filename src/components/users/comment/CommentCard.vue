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
      </CommentCardContent>
    </v-card>
  </v-lazy>
</template>
<script>
import CommentCardContent from '@/components/users/comment/CommentCardContent';
import CommentCardBar from '@/components/users/comment/CommentCardBar';
import CommentFold from '@/components/users/comment/CommentFold';
import { ref } from 'vue';
import { mdiSchoolOutline } from '@mdi/js';

export default {
  setup() {
    const foldComment = ref(true);
    const statics = {
      icons: {
        mdiSchoolOutline,
      },
    };

    return { foldComment, statics };
  },
  props: {
    comment: Object,
  },
  components: {
    CommentCardContent,
    CommentCardBar,
    CommentFold,
  },
};
</script>
