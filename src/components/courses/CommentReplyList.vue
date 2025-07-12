<template>
  <div class="comment-reply-list">
    <div v-if="replies.length > 0" class="mt-3">
      <div v-if="!showAll && replies.length > displayLimit" class="mb-2">
        <v-btn
          text
          small
          color="primary"
          @click="showAll = true"
        >
          查看全部 {{ replies.length }} 条回复
          <v-icon small class="ml-1">{{ mdiChevronDown }}</v-icon>
        </v-btn>
      </div>
      
      <div class="replies-container">
        <CommentReply
          v-for="reply in displayedReplies"
          :key="reply.id"
          :reply="reply"
          @reply="handleReply"
          @like="handleLike"
        />
      </div>
      
      <div v-if="showAll && replies.length > displayLimit" class="mt-2">
        <v-btn
          text
          small
          @click="showAll = false"
        >
          收起回复
          <v-icon small class="ml-1">{{ mdiChevronUp }}</v-icon>
        </v-btn>
      </div>
    </div>
    
    <!-- 回复输入框 -->
    <div v-if="showReplyInput || showReplyToReply" class="mt-3">
      <CommentReplyInput
        :parent-reply="replyTarget"
        @submit="handleSubmitReply"
        @cancel="handleCancelReply"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import CommentReply from './CommentReply.vue';
import CommentReplyInput from './CommentReplyInput.vue';

export default {
  name: 'CommentReplyList',
  components: {
    CommentReply,
    CommentReplyInput
  },
  props: {
    replies: {
      type: Array,
      default: () => []
    },
    commentId: {
      type: Number,
      required: true
    },
    showReplyInput: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit-reply', 'like-reply', 'cancel-reply'],
  setup(props, { emit }) {
    const showAll = ref(false);
    const showReplyToReply = ref(false);
    const replyTarget = ref(null);
    const displayLimit = 3;

    const displayedReplies = computed(() => {
      if (showAll.value) {
        return props.replies;
      }
      return props.replies.slice(0, displayLimit);
    });

    const handleReply = (reply) => {
      replyTarget.value = reply;
      showReplyToReply.value = true;
    };

    const handleSubmitReply = (replyData) => {
      emit('submit-reply', {
        ...replyData,
        comment_id: props.commentId,
        parent_reply_id: replyTarget.value?.id || null,
        parent_user: replyTarget.value?.user || null
      });
      handleCancelReply();
    };

    const handleCancelReply = () => {
      showReplyToReply.value = false;
      replyTarget.value = null;
      emit('cancel-reply');
    };

    const handleLike = (replyId, isLiked) => {
      emit('like-reply', replyId, isLiked);
    };

    return {
      showAll,
      showReplyToReply,
      replyTarget,
      displayLimit,
      displayedReplies,
      handleReply,
      handleSubmitReply,
      handleCancelReply,
      handleLike,
      mdiChevronDown,
      mdiChevronUp
    };
  }
};
</script>

<style scoped>
.replies-container {
  border-left: 2px solid #e0e0e0;
  padding-left: 16px;
}

.theme--dark .replies-container {
  border-left-color: #424242;
}
</style>
