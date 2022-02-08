<template>
  <v-container class="" style="background-color: white">
    <select-bar></select-bar>
    <CommentBox v-for="(comment, index) in commentText" :key="index" :comment="comment" />
  </v-container>
</template>
<script>
import useUser from '@/composables/users/useUser'
import useComment from "@/composables/courses/comment/useComment";
import CommentBox from '@/components/courses/CommentBox'
import SelectBar from '@/components/courses/SelectBar'

export default {
  setup() {
    useUser();
    const { commentText, statics, status } = useComment();
    return { commentText, statics, status };
  },
  components: { CommentBox, SelectBar}
};
</script>
