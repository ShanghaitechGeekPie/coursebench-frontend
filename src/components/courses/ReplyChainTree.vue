<template>
  <div>
    <div
      v-for="node in nodes"
      :key="node.reply.id"
      class="mb-2"
    >
      <v-card outlined class="pa-2">
        <div class="d-flex align-start">
          <AvatarContainer
            :name="displayName(node.reply.user)"
            :src="node.reply.user.avatar"
            size="28"
            small
            tile
            slice
          />
          <div class="pl-2 flex-grow-1">
            <div class="text-caption font-weight-bold">
              {{ displayName(node.reply.user) }}
              <span v-if="node.reply.reply_to" class="grey--text text--darken-1">
                回复 {{ displayName(node.reply.reply_to.user) }}
              </span>
            </div>
            <div class="text-body-2 break-word">{{ node.reply.content }}</div>
            <div class="text-caption grey--text text--darken-1">
              {{ unixToReadable(node.reply.post_time) }}
            </div>
          </div>
        </div>
      </v-card>
      <ReplyChainTree
        v-if="node.children && node.children.length > 0"
        :nodes="node.children"
        :depth="depth + 1"
      />
    </div>
  </div>
</template>

<script>
import AvatarContainer from '@/components/users/profile/AvatarContainer';
import useUserName from '@/composables/global/useUserName';
import { unixToReadable } from '@/composables/global/useTimeUtils';

export default {
  name: 'ReplyChainTree',
  components: {
    AvatarContainer,
  },
  props: {
    nodes: {
      type: Array,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    unixToReadable,
    displayName(user) {
      return useUserName(user);
    },
  },
};
</script>

<style scoped>
.break-word {
  word-break: break-word;
}
</style>
