<template>
  <div
    :style="{ background: theme.isDark ? '' : '#f9f9f9', 'min-height': '100%' }"
  >
    <div>
      <v-sheet
        :color="theme.isDark ? statics.backgroundDark : statics.backgroundLight"
        :height="breakpoint.xsOnly ? 91 : breakpoint.mdAndDown ? 121 : 320"
      ></v-sheet>
      <div class="main-card">
        <v-card width="600px" height="400px" elevation="2">
          <div class="pa-8">
            <div class="text-h4">电子邮箱验证成功!</div>
            <div class="pt-16">
              您的账号已经注册成功，欢迎您使用本系统。
            </div>
          </div>
        </v-card>
      </div>
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
  mounted() {
    console.log(this.$route.query.id);
    console.log(this.$route.query.code);
  },
};
</script>
<style scoped>
.main-card {
  width: 600px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}
</style>