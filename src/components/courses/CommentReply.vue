<template>
  <div class="comment-reply pa-3 mb-2">
    <div class="d-flex">
      <div class="flex-shrink-0 pr-3">
        <v-avatar size="32" color="grey lighten-2">
          <v-img v-if="reply.user.avatar" :src="reply.user.avatar" />
          <v-icon v-else>{{ mdiAccount }}</v-icon>
        </v-avatar>
      </div>
      <div class="flex-grow-1">
        <div class="d-flex align-center mb-1">
          <span class="font-weight-medium text-body-2 mr-2">
            {{ reply.user.nickname }}
          </span>
          <span v-if="reply.parent_user" class="text-caption text--secondary mr-2">
            回复 {{ reply.parent_user.nickname }}
          </span>
          <span class="text-caption text--secondary">
            {{ formatTime(reply.created_at) }}
          </span>
        </div>
        <div class="text-body-2 mb-2">
          {{ reply.content }}
        </div>
        <div class="d-flex align-center">
          <v-btn
            small
            :color="isLiked ? 'primary' : 'primary'"
            elevation="0"
            :text="!isLiked"
            :outlined="!isLiked"
            class="like-button mr-2"
            @click="toggleLike"
          >
            <v-icon size="14" class="mr-1">{{ mdiThumbUp }}</v-icon>
            <span class="text-caption">{{ reply.like }}</span>
          </v-btn>
          <v-btn
            small
            color="primary"
            elevation="0"
            outlined
            class="mr-2"
            @click="$emit('reply', reply)"
          >
            <span class="text-caption">回复</span>
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { mdiAccount, mdiThumbUp } from '@mdi/js';

export default {
  name: 'CommentReply',
  props: {
    reply: {
      type: Object,
      required: true
    }
  },
  emits: ['reply', 'like'],
  setup(props, { emit }) {
    const isLiked = ref(false);

    const toggleLike = () => {
      isLiked.value = !isLiked.value;
      emit('like', props.reply.id, isLiked.value);
    };

    const formatTime = (timeStr) => {
      const date = new Date(timeStr);
      const now = new Date();
      const diff = now - date;
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(diff / 3600000);
      const days = Math.floor(diff / 86400000);

      if (days > 0) return `${days}天前`;
      if (hours > 0) return `${hours}小时前`;
      if (minutes > 0) return `${minutes}分钟前`;
      return '刚刚';
    };

    return {
      isLiked,
      toggleLike,
      formatTime,
      mdiAccount,
      mdiThumbUp
    };
  }
};
</script>

<style scoped>
.comment-reply {
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: 8px;
}

.theme--dark .comment-reply {
  background-color: rgba(255, 255, 255, 0.05);
}

.like-button {
  padding: 0 !important;
}
</style>
