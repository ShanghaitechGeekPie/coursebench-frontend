<template>
  <v-container class="" style="background-color: white">
    <select-bar></select-bar>
    <CommentBox v-for="(comment, index) in comments" :key="index" :comment="comment" />
    <div class="text-center grey--text text-body-2">
      没有更多评论了
    </div>
  </v-container>
</template>
<script>
import CommentBox from '@/components/courses/CommentBox'
import SelectBar from '@/components/courses/SelectBar'

export default {
  props : {
    comments: Array
  },
  components: { CommentBox, SelectBar},
  mounted() {
    console.log(this.comments);
    console.log("Here");
  }
};
</script>
