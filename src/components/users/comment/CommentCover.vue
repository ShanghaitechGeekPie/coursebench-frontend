<template>
  <v-sheet
    outlined
    class="pa-sm-4 pa-2 mb-sm-0 mb-5"
    :color="$vuetify.theme.dark ? '#121212' : '#f5f5f5'"
    rounded="lg"
  >
    <div
      class="text-sm-body-1 text-body-2 d-flex align-center mb-1 mb-sm-0"
      style="height: 28px"
    >
      <div>
        以下评论已被 AI 生成内容遮盖。
        <a class="inline-link" href="https://clarivy.github.io/coursebench-ai/">
          什么是 CourseBench AI?
        </a>
      </div>
    </div>
    <div class="text-sm-body-1 text-body-2 d-flex align-center">
      <div class="text-caption">遮盖原因（由AI自动生成）: {{ reason }}</div>
    </div>
  </v-sheet>
</template>
<script>
import useInsitePush from '@/composables/global/useInsitePush';
import { inject } from 'vue';

export default {
  setup() {
    const global = inject('global');

    return {
      useInsitePush,
      global,
    };
  },
  props: {
    reason: {
      type: String,
      default: '...',
    },
  },
};
</script>
<style scoped>
.inline-link {
  color: #0067bf;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
}

.inline-link:hover {
  text-decoration: underline;
}
</style>
