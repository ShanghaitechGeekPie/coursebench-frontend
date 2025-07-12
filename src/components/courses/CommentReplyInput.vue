<template>
  <div class="comment-reply-input">
    <v-card outlined class="pa-3">
      <div v-if="parentReply" class="mb-2 pa-2 grey lighten-4 rounded">
        <div class="text-caption text--secondary">
          回复 {{ parentReply.user.nickname }}:
        </div>
        <div class="text-body-2">
          {{ parentReply.content.length > 50 ? parentReply.content.substring(0, 50) + '...' : parentReply.content }}
        </div>
      </div>
      
      <v-textarea
        v-model="replyContent"
        placeholder="写下你的回复..."
        rows="3"
        outlined
        dense
        hide-details="auto"
        :rules="[rules.required, rules.maxLength]"
        counter="500"
      />
      
      <div class="d-flex justify-end mt-3">
        <v-btn
          text
          small
          class="mr-2"
          @click="$emit('cancel')"
        >
          取消
        </v-btn>
        <v-btn
          color="primary"
          small
          :disabled="!canSubmit"
          :loading="submitting"
          @click="handleSubmit"
        >
          回复
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import { ref, computed, inject } from 'vue';

export default {
  name: 'CommentReplyInput',
  props: {
    parentReply: {
      type: Object,
      default: null
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const global = inject('global');
    // const showSnackbar = inject('showSnackbar');
    const replyContent = ref('');
    const submitting = ref(false);

    const rules = {
      required: value => !!value || '回复内容不能为空',
      maxLength: value => (value && value.length <= 500) || '回复内容不能超过500字'
    };

    const canSubmit = computed(() => {
      return replyContent.value.trim().length > 0 && 
             replyContent.value.length <= 500 &&
             global.isLogin;
    });

    const handleSubmit = async () => {
      if (!canSubmit.value) return;
      
      submitting.value = true;
      
      try {
        const replyData = {
          content: replyContent.value.trim(),
          user: global.userProfile
        };
        
        emit('submit', replyData);
        replyContent.value = '';
      } finally {
        submitting.value = false;
      }
    };

    return {
      replyContent,
      submitting,
      rules,
      canSubmit,
      handleSubmit
    };
  }
};
</script>

<style scoped>
.comment-reply-input {
  margin-left: 16px;
  border-left: 2px solid #e0e0e0;
  padding-left: 16px;
}

.theme--dark .comment-reply-input {
  border-left-color: #424242;
}
</style>
