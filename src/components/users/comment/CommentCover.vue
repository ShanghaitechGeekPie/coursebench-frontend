<template>
    <v-sheet
      outlined
      class="pa-sm-4 pa-2 mb-sm-0 mb-5"
      :color="$vuetify.theme.dark ? '#121212' : '#f5f5f5'"
      rounded="lg"
    >
      <div
        class="text-sm-body-1 text-body-2 d-flex align-center"
        style="height: 28px"
      >
        <div>
          以下评论已被 AI 生成内容遮盖。
          <span
            class="inline-link"
            @click="$router.push('/about'), useInsitePush('#privacy_policy')"
            >查看隐私政策</span
          >
        </div>
      </div>     
      <div
        class="text-sm-body-1 text-body-2 d-flex align-center"
      >
        <div class="text-caption">
          遮盖原因：{{ reason }}
        </div>
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
    }
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
  