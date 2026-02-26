<template>
  <div class="pt-1 pb-2">
    <v-divider class="mb-2" />
    <div class="d-flex justify-space-between align-center mb-2">
      <div class="text-subtitle-2">{{ totalCount }} 条回复</div>
      <div class="d-flex" v-if="showAll">
        <v-btn
          x-small
          outlined
          class="mr-1"
          :color="sortBy === 'latest' ? 'primary' : ''"
          @click="changeSort('latest')"
        >
          最新
        </v-btn>
        <v-btn
          x-small
          outlined
          :color="sortBy === 'hottest' ? 'primary' : ''"
          @click="changeSort('hottest')"
        >
          最热
        </v-btn>
      </div>
    </div>

    <div v-if="loading" class="py-2 d-flex justify-center">
      <v-progress-circular indeterminate color="primary" size="20" />
    </div>

    <div v-else>
      <v-card
        v-for="reply in replies"
        :key="reply.id"
        outlined
        class="mb-2 pa-2 reply-card"
      >
        <div class="d-flex align-start">
          <AvatarContainer
            :name="displayName(reply.user)"
            :src="reply.user ? reply.user.avatar : ''"
            size="30"
            small
            tile
            slice
          />
          <div class="pl-2 flex-grow-1">
            <div class="text-caption font-weight-bold">
              {{ displayName(reply.user) }}
              <span v-if="reply.reply_to && reply.reply_to.user" class="grey--text text--darken-1">
                回复 {{ displayName(reply.reply_to.user) }}
              </span>
              <span v-else-if="reply.reply_to" class="grey--text text--darken-1">
                回复 匿名用户
              </span>
            </div>
            <div class="text-body-2 break-word">{{ reply.content }}</div>
            <div class="text-caption grey--text text--darken-1 mt-1">
              {{ unixToReadable(reply.post_time) }}
            </div>

            <div class="d-flex align-center mt-1" style="flex-wrap: wrap; gap: 4px">
              <v-btn x-small text color="primary" @click="onToggleLike(reply, 1)">
                <v-icon left x-small>{{ reply.like_status === 1 ? icons.mdiThumbUp : icons.mdiThumbUpOutline }}</v-icon>
                {{ reply.like }}
              </v-btn>
              <v-btn x-small text color="primary" @click="onToggleLike(reply, 2)">
                <v-icon left x-small>{{ reply.like_status === 2 ? icons.mdiThumbDown : icons.mdiThumbDownOutline }}</v-icon>
                {{ reply.dislike }}
              </v-btn>
              <v-btn x-small text color="primary" @click="onShare(reply)">
                <v-icon left x-small>{{ icons.mdiShareVariantOutline }}</v-icon>
                分享
              </v-btn>
              <v-btn x-small text color="primary" @click="setReplyTarget(reply)">
                <v-icon left x-small>{{ icons.mdiReplyOutline }}</v-icon>
                回复
              </v-btn>
              <v-btn
                v-if="reply.has_sub_replies || reply.reply_to"
                x-small
                text
                color="primary"
                @click="openChain(reply.id)"
              >
                查看对话
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>

      <v-btn
        v-if="!showAll && totalCount > filteredCount"
        text
        small
        color="primary"
        class="mb-2"
        @click="showAllReplies"
      >
        查看所有 {{ totalCount }} 条回复
      </v-btn>

      <div v-if="global.isLogin" ref="replyInputArea" class="mt-2">
        <div v-if="replyTarget" class="mb-2">
          <div class="text-caption mb-1">
            正在回复 {{ displayName(replyTarget.user) }}
            <v-btn x-small text color="error" @click="clearReplyTarget">取消</v-btn>
          </div>
          <div class="reply-preview pa-2 text-body-2 grey--text text--darken-1">
            {{ truncateContent(replyTarget.content) }}
          </div>
        </div>
        <v-textarea
          v-model="replyContent"
          outlined
          dense
          hide-details
          rows="2"
          auto-grow
          placeholder="写下你的回复..."
        />
        <div class="d-flex justify-space-between align-center mt-2">
          <v-checkbox
            v-model="isAnonymous"
            dense
            hide-details
            class="mt-0 pt-0"
            label="匿名"
          />
          <v-btn small color="primary" :loading="submitting" @click="submitReply">
            发布回复
          </v-btn>
        </div>
      </div>
      <v-alert v-else dense outlined type="info" class="mb-0" @click="onRequireLogin">
        登录后发布回复
      </v-alert>
    </div>

    <ReplyChainDialog
      v-model="chainDialog"
      :chain="chainData"
      :loading="chainLoading"
    />
  </div>
</template>

<script>
import axios from 'axios';
import Config from 'Config';
import { inject } from 'vue';
import {
  mdiThumbUpOutline,
  mdiThumbDownOutline,
  mdiThumbUp,
  mdiThumbDown,
  mdiShareVariantOutline,
  mdiReplyOutline,
} from '@mdi/js';
import AvatarContainer from '@/components/users/profile/AvatarContainer';
import ReplyChainDialog from '@/components/courses/ReplyChainDialog';
import useUserName from '@/composables/global/useUserName';
import { unixToReadable } from '@/composables/global/useTimeUtils';

export default {
  components: {
    AvatarContainer,
    ReplyChainDialog,
  },
  props: {
    commentId: {
      type: Number,
      required: true,
    },
  },
  setup() {
    const global = inject('global');
    const showSnackbar = inject('showSnackbar');
    return {
      global,
      showSnackbar,
    };
  },
  data() {
    return {
      loading: false,
      submitting: false,
      chainLoading: false,
      chainDialog: false,
      chainData: null,
      replies: [],
      totalCount: 0,
      filteredCount: 0,
      sortBy: 'latest',
      showAll: false,
      replyContent: '',
      replyTarget: null,
      isAnonymous: false,
      icons: {
        mdiThumbUpOutline,
        mdiThumbDownOutline,
        mdiThumbUp,
        mdiThumbDown,
        mdiShareVariantOutline,
        mdiReplyOutline,
      },
    };
  },
  watch: {
    commentId: {
      immediate: true,
      handler() {
        this.fetchReplies();
      },
    },
  },
  methods: {
    unixToReadable,
    displayName(user) {
      return user ? useUserName(user) : '匿名用户';
    },
    async fetchReplies() {
      this.loading = true;
      try {
        const response = await axios.get(
          `${Config.serverUrl}/comment/${this.commentId}/replies`,
          {
            params: {
              sort: this.sortBy,
              all: this.showAll ? 1 : 0,
            },
          },
        );
        const data = response.data && response.data.data ? response.data.data : {};
        this.replies = data.replies || [];
        this.totalCount = data.total_count || 0;
        this.filteredCount = data.filtered_count || 0;
      } catch (error) {
        this.showSnackbar('error', '获取回复失败');
      } finally {
        this.loading = false;
      }
    },
    async submitReply() {
      if (!this.global.isLogin) {
        this.onRequireLogin();
        return;
      }
      if (!this.replyContent.trim()) {
        this.showSnackbar('warning', '回复内容不能为空');
        return;
      }
      this.submitting = true;
      try {
        await axios.post(`${Config.serverUrl}/comment/${this.commentId}/reply`, {
          parent_reply_id: this.replyTarget ? this.replyTarget.id : null,
          content: this.replyContent,
          is_anonymous: this.isAnonymous,
        });
        this.replyContent = '';
        this.replyTarget = null;
        this.showSnackbar('success', '回复已发布');
        await this.fetchReplies();
      } catch (error) {
        const msg =
          error && error.response && error.response.data && error.response.data.msg
            ? error.response.data.msg
            : '回复发布失败';
        this.showSnackbar('error', msg);
      } finally {
        this.submitting = false;
      }
    },
    changeSort(sortBy) {
      if (this.sortBy === sortBy) {
        return;
      }
      this.sortBy = sortBy;
      this.fetchReplies();
    },
    showAllReplies() {
      if (this.showAll) {
        return;
      }
      this.showAll = true;
      this.fetchReplies();
    },
    setReplyTarget(reply) {
      if (!this.global.isLogin) {
        this.onRequireLogin();
        return;
      }
      this.replyTarget = reply;
      this.$nextTick(() => {
        if (this.$refs.replyInputArea) {
          this.$refs.replyInputArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    },
    truncateContent(content) {
      if (!content) return '';
      const lines = content.split('\n');
      if (lines.length <= 1) {
        return content.length > 100 ? content.substring(0, 100) + '...' : content;
      }
      const firstLine = lines.slice(0, 1).join('\n');
      return firstLine.length > 100
        ? firstLine.substring(0, 100) + '...'
        : firstLine + '...';
    },
    clearReplyTarget() {
      this.replyTarget = null;
    },
    async onToggleLike(reply, desiredStatus) {
      if (!this.global.isLogin) {
        this.onRequireLogin();
        return;
      }
      const status = reply.like_status === desiredStatus ? 0 : desiredStatus;
      try {
        await axios.post(`${Config.serverUrl}/reply/like`, {
          id: reply.id,
          status,
        });
        this.applyLikeStatus(reply, status);
      } catch (error) {
        this.showSnackbar('error', '操作失败');
      }
    },
    applyLikeStatus(reply, nextStatus) {
      const prevStatus = reply.like_status || 0;
      if (prevStatus === 1) {
        reply.like = Math.max(0, reply.like - 1);
      } else if (prevStatus === 2) {
        reply.dislike = Math.max(0, reply.dislike - 1);
      }

      if (nextStatus === 1) {
        reply.like += 1;
      } else if (nextStatus === 2) {
        reply.dislike += 1;
      }
      reply.like_status = nextStatus;
    },
    onShare(reply) {
      const sharePath = `${window.location.origin}${this.$route.path}?answer=${this.commentId}&reply=${reply.id}`;
      navigator.clipboard.writeText(sharePath);
      this.showSnackbar('success', '已复制回复链接');
    },
    async openChain(replyId) {
      this.chainDialog = true;
      this.chainLoading = true;
      this.chainData = null;
      try {
        const response = await axios.get(`${Config.serverUrl}/reply/${replyId}/chain`);
        this.chainData = response.data ? response.data.data : null;
      } catch (error) {
        this.showSnackbar('error', '获取对话失败');
      } finally {
        this.chainLoading = false;
      }
    },
    onRequireLogin() {
      this.showSnackbar('warning', '请先登录');
    },
  },
};
</script>

<style scoped>
.break-word {
  white-space: pre-wrap;
  word-break: break-word;
}
.reply-card {
  background: transparent;
}
.reply-preview {
  border-radius: 4px;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.875rem;
  line-height: 1.4;
  font-style: italic;
  .theme--dark & {
    background-color: rgba(0, 0, 0, 0.05);
    border-left: 3px solid rgba(255, 255, 255, 0.5);
  }
  .theme--light & {
    background-color: rgba(0, 0, 0, 0.05);
    border-left: 3px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
