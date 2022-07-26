<template>
  <v-lazy>
    <v-card class="mb-3" flat max-width="800" outlined>
      <CommentCardBar :comment="comment" />
      <CommentCardContent :comment="comment" />
    </v-card>
  </v-lazy>
</template>
<script>
import CommentCardContent from "@/components/users/comment/CommentCardContent";
import CommentCardBar from "@/components/users/comment/CommentCardBar";

export default {
  props: {
    comment: Object,
    showType: {
      type: String,
      default: "user"
    }
  },
  components: {
    CommentCardContent,
    CommentCardBar,
  },
};
</script>
