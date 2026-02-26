<template>
  <v-dialog :value="value" max-width="760" @input="$emit('input', $event)">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <span>查看对话</span>
        <v-btn icon @click="$emit('input', false)">
          <v-icon>{{ icons.mdiClose }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text style="max-height: 70vh; overflow-y: auto">
        <div v-if="loading" class="py-4 d-flex justify-center">
          <v-progress-circular indeterminate color="primary" />
        </div>
        <div v-else-if="!chain">
          <div class="text-caption grey--text">暂无对话内容</div>
        </div>
        <div v-else>
          <div class="text-subtitle-2 mb-2">上文</div>
          <v-card
            v-for="ancestor in chain.ancestors"
            :key="ancestor.id"
            outlined
            class="pa-2 mb-2"
          >
            <div class="d-flex align-start">
              <AvatarContainer
                :name="displayName(ancestor.user)"
                :src="ancestor.user ? ancestor.user.avatar : ''"
                size="28"
                small
                tile
                slice
              />
              <div class="pl-2 flex-grow-1">
                <div class="text-caption font-weight-bold">
                  {{ displayName(ancestor.user) }}
                  <span
                    v-if="ancestor.reply_to && ancestor.reply_to.user"
                    class="grey--text text--darken-1"
                  >
                    回复 {{ displayName(ancestor.reply_to.user) }}
                  </span>
                  <span
                    v-else-if="ancestor.reply_to"
                    class="grey--text text--darken-1"
                  >
                    回复 匿名用户
                  </span>
                </div>
                <div class="text-body-2 break-word">{{ ancestor.content }}</div>
                <div class="text-caption grey--text text--darken-1">
                  {{ unixToReadable(ancestor.post_time) }}
                </div>
              </div>
            </div>
          </v-card>

          <div class="text-subtitle-2 mb-2 mt-4">当前回复</div>
          <v-card outlined class="pa-2 mb-3 primary--text">
            <div class="d-flex align-start">
              <AvatarContainer
                :name="displayName(chain.current.user)"
                :src="chain.current.user ? chain.current.user.avatar : ''"
                size="28"
                small
                tile
                slice
              />
              <div class="pl-2 flex-grow-1">
                <div class="text-caption font-weight-bold">
                  {{ displayName(chain.current.user) }}
                  <span
                    v-if="chain.current.reply_to && chain.current.reply_to.user"
                    class="grey--text text--darken-1"
                  >
                    回复 {{ displayName(chain.current.reply_to.user) }}
                  </span>
                  <span
                    v-else-if="chain.current.reply_to"
                    class="grey--text text--darken-1"
                  >
                    回复 匿名用户
                  </span>
                </div>
                <div class="text-body-2 break-word">{{ chain.current.content }}</div>
                <div class="text-caption grey--text text--darken-1">
                  {{ unixToReadable(chain.current.post_time) }}
                </div>
              </div>
            </div>
          </v-card>

          <div class="text-subtitle-2 mb-2">下文</div>
          <ReplyChainTree :nodes="chain.descendants || []" :depth="0" />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js';
import AvatarContainer from '@/components/users/profile/AvatarContainer';
import ReplyChainTree from '@/components/courses/ReplyChainTree';
import useUserName from '@/composables/global/useUserName';
import { unixToReadable } from '@/composables/global/useTimeUtils';

export default {
  components: {
    AvatarContainer,
    ReplyChainTree,
  },
  props: {
    value: {
      type: Boolean,
      required: true,
    },
    chain: {
      type: Object,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      icons: {
        mdiClose,
      },
    };
  },
  methods: {
    unixToReadable,
    displayName(user) {
      return user ? useUserName(user) : '匿名用户';
    },
  },
};
</script>

<style scoped>
.break-word {
  word-break: break-word;
}
</style>
