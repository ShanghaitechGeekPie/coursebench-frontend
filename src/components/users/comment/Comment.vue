<template>
  <v-container class="py-sm-3 py-0">
    <v-row>
      <v-col
        class="pl-sm-0 pr-sm-3 pl-0 pr-0 pt-sm-3 pt-0"
      >
        <CommentCard
          v-for="(comment, index) in commentText"
          :key="index"
          :comment="comment"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import useComment from "@/composables/users/comment/useComment";
import CommentCard from "@/components/users/comment/CommentCard";

export default {
  setup() {
    const { commentText, statics, status } = useComment();
    return { commentText, statics, status };
  },
  components: { CommentCard },
};
</script>