<template>
  <v-container class="" style="background-color: white">
    <CommentBox v-for="(comment, index) in sortedComment" :key="index" :comment="comment" />
    <div class="text-center grey--text text-body-2">
      没有更多评论了
    </div>
  </v-container>
</template>
<script>
import CommentBox from '@/components/courses/CommentBox'
import useCommentBoard from "@/composables/courses/comment/useCommentBoard";

export default {
  setup() {
    const { commentOrder } = useCommentBoard();
    return { commentOrder };
  },
  props : {
    comments: Array,
  },
  components: { CommentBox },
  computed: {
    sortedComment() {
      return this.sortComment();
    }
  },
  methods: {
    sortComment() {
      let result = this.comments
      let compareFn = (a, b) => {
        if (this.commentOrder.reverse === "升序") {
          // console.log("DD", a, b, a <= b)
          if (a > b) return 1
          if (a < b) return -1
          return 0
        }
        if (this.commentOrder.reverse === "降序") {
          if (a > b) return -1
          if (a < b) return 1
          return 0
        }
        return a <= b
      }
      result = result.sort((a, b) => {
        if (this.commentOrder.sortBy === "时间") {
          return compareFn(a.post_time, b.post_time)
        }
        else if (this.commentOrder.sortBy === "评分") {
          return compareFn(a.score[a.score.length - 1], b.score[b.score.length - 1])
        }
      })
      return result
    }
  },
  watch: {
    commentOrder: {
      handler() {
        this.sortComment()
      },
      deep: true
    }
  },
  mounted() {
  }
};
</script>
