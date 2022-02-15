<template>
  <v-lazy>
    <div v-if="status.selected.some(school => school === comment.course.institute)">
      <v-card class="mb-3 transition-swing" flat max-width="800">
        <CommentCardBar :comment="comment" />
        <CommentCardContent :comment="comment" />
      </v-card>
    </div>
  </v-lazy>
</template>
<script>
import useCommentCard from "@/composables/users/comment/useCommentCard";
import CommentCardContent from '@/components/users/comment/CommentCardContent'
import CommentCardBar from '@/components/users/comment/CommentCardBar'

export default {
  setup() {
    const { statics, status } = useCommentCard();
    return { statics, status };
  },
  props: {
    comment: Object,
  },
  components: {
    CommentCardContent, 
    CommentCardBar, 
  },
};
</script>