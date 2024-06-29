<template>
  <v-sheet
    outlined
    class="pa-sm-4 pa-2 mb-sm-0 mb-5 d-flex justify-space-between"
    :color="$vuetify.theme.dark ? '#121212' : '#f5f5f5'"
    rounded="lg"
  >
    <div
      class="text-sm-body-1 text-body-2 d-flex align-center"
      style="height: 28px"
    >
      <div>
        以下评论可能包含违规内容。
        <span
          class="inline-link"
          @click="$router.push('/about'), useInsitePush('#privacy_policy')"
          >查看隐私政策</span
        >
      </div>
    </div>
    <div v-if="global.isLogin" class="d-sm-block d-flex align-center">
      <v-btn
        elevation="0"
        :small="$vuetify.breakpoint.smAndUp"
        :x-small="$vuetify.breakpoint.xsOnly"
        @click="$emit('click')"
      >
        <span class="font-weight-bold text-sm-body-1 text-body-2">查看</span>
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
