<template>
  <v-container class="" style="background-color: white">
    <CommentBox v-for="(comment, index) in commentText" :key="index" :comment="comment" />
  </v-container>
</template>
<script>
import useUser from '@/composables/users/useUser'
import useComment from "@/composables/courses/comment/useComment";
import CommentBox from '@/components/courses/CommentBox'

export default {
  setup() {
    useUser();
    const { commentText, statics, status } = useComment();
    return { commentText, statics, status };
  },
  components: { CommentBox }
};
</script>
