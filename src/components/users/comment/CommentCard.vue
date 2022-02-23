<template>
  <v-lazy>
    <v-fade-transition>
      <v-card class="mb-3" flat max-width="800">
        <CommentCardBar :comment="comment" />
        <CommentCardContent :comment="comment" />
      </v-card>
    </v-fade-transition>
  </v-lazy>
</template>
<script>
import CommentCardContent from "@/components/users/comment/CommentCardContent";
import CommentCardBar from "@/components/users/comment/CommentCardBar";

export default {
  props: {
    comment: Object,
  },
  components: {
    CommentCardContent,
    CommentCardBar,
  },
};
</script>