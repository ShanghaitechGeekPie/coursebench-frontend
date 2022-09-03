<template>
  <div
    v-if="status.loading"
    :style="
      $vuetify.breakpoint.xsOnly
        ? {}
        : { background: $vuetify.theme.isDark ? '' : '#f9f9f9', 'min-height': '100%' }
    "
  >
    <v-sheet
      v-if="!$vuetify.breakpoint.xsOnly"
      :color="$vuetify.theme.isDark ? statics.backgroundDark : statics.backgroundLight"
      :height="$vuetify.breakpoint.xsOnly ? 91 : 360"
    ></v-sheet>
    <v-overlay :value="status.loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
  <div v-else-if="$vuetify.breakpoint.xsOnly">
    <div class="main-card" style="min-width: 300px">
      <div class="d-flex justify-center">
        <v-icon v-if="status.errorMessage == ''" size="160" color="success">
          {{ statics.icons.mdiCheckboxMarkedCircleOutline }}
        </v-icon>
        <v-icon v-else size="160" color="error">
          {{ statics.icons.mdiCloseCircleOutline }}
        </v-icon>
      </div>
      <div>
        <div v-if="status.errorMessage == ''">
          <div class="text-h4 pt-6 text-center">电子邮箱验证成功!</div>
          <div class="pt-6 word-wrap text-center">
            您的账号已经注册成功，欢迎您使用本系统。
          </div>
        </div>
        <div v-else>
          <div class="text-h4 pt-6 text-center">发生错误!</div>
          <div class="pt-6 word-wrap text-center">
            {{ status.errorMessage }}，请稍后重试。
          </div>
        </div>
        <div v-if="!status.loading" class="d-flex justify-center pt-16">
          <v-btn
            width="90px"
            elevation="1"
            color="primary"
            @click="$router.push('/')"
          >
            返回首页
          </v-btn>
        </div>
      </div>
    </div>
  </div>
  <div
    :style="{ background: $vuetify.theme.isDark ? '' : '#f9f9f9', 'min-height': '100%' }"
    v-else
  >
    <v-sheet
      :color="$vuetify.theme.isDark ? statics.backgroundDark : statics.backgroundLight"
      :height="$vuetify.breakpoint.xsOnly ? 91 : '40vh'"
    ></v-sheet>
    <v-fade-transition>
      <div class="main-card">
        <v-card
          width="600px"
          height="400px"
          elevation="2"
          class="d-flex justify-space-between flex-column"
        >
          <div class="px-16 pt-16 d-flex">
            <div style="height: 100%">
              <v-icon
                v-if="status.errorMessage == ''"
                size="128"
                color="success"
              >
                {{ statics.icons.mdiCheckboxMarkedCircleOutline }}
              </v-icon>
              <v-icon v-else size="128" color="error">
                {{ statics.icons.mdiCloseCircleOutline }}
              </v-icon>
            </div>
            <div
              class="pl-6 d-flex justify-space-between flex-column"
              style="max-width: 344px; height: 100%"
            >
              <div v-if="status.errorMessage == ''">
                <div class="text-h4 pt-6">电子邮箱验证成功!</div>
                <div class="pt-6 word-wrap">
                  您的账号已经注册成功，欢迎您使用本系统。
                </div>
              </div>
              <div v-else>
                <div class="text-h4 pt-6">发生错误!</div>
                <div class="pt-6 word-wrap">
                  {{ status.errorMessage }}
                </div>
              </div>
            </div>
          </div>
          <div class="px-16 pb-16 d-flex justify-end">
            <div class="d-flex justify-end pb-6 pr-4">
              <v-btn
                width="90px"
                elevation="1"
                color="primary"
                @click="$router.push('/')"
              >
                返回首页
              </v-btn>
            </div>
          </div>
        </v-card>
      </div>
    </v-fade-transition>
  </div>
</template>

<script>
import useActive from "@/composables/users/useActive";

export default {
  setup() {
    const { statics, status } = useActive();
    return { statics, status };
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

.word-wrap {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
</style>
