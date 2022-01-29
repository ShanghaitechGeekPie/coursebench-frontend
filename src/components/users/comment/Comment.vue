<template>
  <v-container class="py-sm-3 py-0">
    <v-row>
      <v-col cols="12" md="3" order-md="last" class="px-sm-0 px-0 pt-6 pt-sm-3">
        <v-info-card></v-info-card>
      </v-col>
      <v-col cols="12" md="9" order-md="first" class="pl-sm-0 pr-sm-3 pl-0 pr-0 pt-sm-3 pt-0">
        <v-comment-card
          v-for="(comment, index) in commentText"
          :key="index"
          :comment="comment"
        ></v-comment-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import useComment from "@/composables/users/comment/useComment";
import StatisticCard from '@/components/users/comment/StatisticCard'
import CommentCard from '@/components/users/comment/CommentCard'

export default {
  setup() {
    const { commentText, statics, status } = useComment();
    return { commentText, statics, status };
  },
  components: {
    'v-info-card': StatisticCard, 
    'v-comment-card': CommentCard
  }
};
</script>