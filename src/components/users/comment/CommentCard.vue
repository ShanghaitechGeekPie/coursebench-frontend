<template>
  <v-lazy>
    <v-hover #default="{ hover }" close-delay="50" open-delay="50">
      <v-card class="mb-3 transition-swing" :elevation="hover ? 8 : 4">
        <CommentCardBar :comment="comment" />
        <CommentCardContent :comment="comment" />
        
      </v-card>
    </v-hover>
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
  }
};
</script>