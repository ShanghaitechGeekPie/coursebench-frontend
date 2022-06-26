<template>
  <div v-if="breakpoint.xsOnly">
    <div class="main-card" style="min-width: 300px">
      <div class="d-flex justify-center">
        <v-icon size="160" color="success">
          {{ statics.icons.mdiCheckboxMarkedCircleOutline }}
        </v-icon>
      </div>
      <div>
        <div>
          <div class="text-h4 pt-6">电子邮箱验证成功!</div>
          <div class="pt-6 word-wrap">
            您的账号已经注册成功，欢迎您使用本系统。
          </div>
        </div>
        <div class="d-flex justify-center pt-8">
          <router-link to="/">返回首页</router-link>
        </div>
      </div>
    </div>
  </div>
  <div :class="[theme.isDark ? 'wrapper-dark' : 'wrapper-light']" v-else>
    <div class="main-card">
      <v-card width="600px" height="400px" elevation="2">
        <div class="pa-16 d-flex justify-space-between" style="height: 100%">
          <div style="height: 100%">
            <v-icon size="128" color="success">
              {{ statics.icons.mdiCheckboxMarkedCircleOutline }}
            </v-icon>
          </div>
          <div
            class="pl-6 d-flex justify-space-between flex-column"
            style="max-width: 344px; height: 100%"
          >
            <div>
              <div class="text-h4 pt-6">电子邮箱验证成功!</div>
              <div class="pt-6 word-wrap">
                您的账号已经注册成功，欢迎您使用本系统。
              </div>
            </div>
            <div class="d-flex justify-end pb-6 pr-4">
              <router-link to="/">返回首页</router-link>
            </div>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import useVerify from "@/composables/users/useVerify";

export default {
  setup() {
    const { statics } = useVerify();
    return { statics };
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
      theme: this.$vuetify.theme,
    };
  },
};
</script>
<style scoped>
.main-card {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}

.wrapper-light {
  min-height: 100%;
  background-image: linear-gradient(
    to top,
    #f9f9f9,
    #f0f2fa,
    #e1eefc,
    #cdeafa,
    #b8e7f4
  );
}

.wrapper-dark {
  min-height: 100%;
  background-image: linear-gradient(
    to bottom,
    #272727,
    #313131,
    #3b3b3b,
    #464546,
    #515050
  );
}

.word-wrap {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
</style>