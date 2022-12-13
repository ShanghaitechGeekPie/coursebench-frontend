<template>
  <v-sheet
    outlined
    class="px-4 py-4 d-flex justify-space-between"
    color="#f5f5f5"
    rounded="lg"
  >
    <div class="text-body-1 d-flex align-center" style="height: 28px">
      <div>
        以下评论可能包含敏感内容。
        <span
          class="inline-link"
          @click="$router.push('/about'), useInsitePush('#privacy_policy')"
          >查看隐私政策</span
        >
      </div>
    </div>
    <div v-if="global.isLogin">
      <v-btn elevation="0" small @click="$emit('click')">
        <span class="font-weight-bold text-body-1">查看</span>
      </v-btn>
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
};
</script>
<style scoped>
.inline-link {
  color: #0067bf;
  cursor: pointer;
}

.inline-link:hover {
  text-decoration: underline;
}
</style>
