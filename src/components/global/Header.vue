<template>
  <v-app-bar app color="white" elevate-on-scroll>
    <v-toolbar-title class="px-8">!!LOGO!!</v-toolbar-title>
    <v-tabs>
      <v-tab to="/">全部课程</v-tab>
      <v-tab to="/course/1">课程详情</v-tab>
      <v-tab to="/about">关于我们</v-tab>
    </v-tabs>
    <v-spacer></v-spacer>
    <v-btn
      color="primary"
      class="px-8"
      @click="dialog.login = true"
      v-if="!global.isLogin"
      elevation="0"
    >
      登录
    </v-btn>
    <v-btn
      class="px-8 ml-4 mr-8"
      @click="dialog.register = true"
      v-if="!global.isLogin"
      elevation="0"
    >
      注册
    </v-btn>
    <v-menu left bottom offset-y transition="slide-y-transition" v-else>
      <template #activator="{ on }">
        <v-btn v-on="on" icon>
          <AvatarContainer
            small
            size="38"
            :name="useShortName(global.userProfile)"
            slice
            style="transform: translate(-1px, 0)"
            :src="global.userProfile.avatar"
          />
        </v-btn>
      </template>
      <v-list close-on-click width="340px">
        <v-list-item class="py-4 px-8 d-block">
          <div class="d-flex justify-center over">
            <AvatarContainer
              size="80"
              fontSize="text-h4"
              :name="useShortName(global.userProfile)"
              slice
              :src="global.userProfile.avatar"
            />
          </div>
          <div class="d-flex justify-center">
            <div class="overflow-ellipsis font-weight-bold pt-4">
              {{ global.userProfile.nickname }}Zhangyhduludulu111111111111111
            </div>
          </div>
          <div class="d-flex justify-center">
            <div class="text-body-2 text--darken-1 grey--text overflow-ellipsis py-1">
              {{ global.userProfile.email }}aaaaaaaaaaaaaaaaaaa
            </div>
          </div>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link to="/user" class="px-8">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiAccountOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-body-1">个人中心</v-list-item-title>
        </v-list-item>
        <v-list-item link to="" class="px-8">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiMessageAlertOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-body-1">反馈</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="doLogout()" class="px-8">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiLogoutVariant }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title class="text-body-1">注销</v-list-item-title>
        </v-list-item>
        <v-list-item class="d-flex justify-center">            
          <v-btn text x-small class="text-caption">隐私政策</v-btn>
          <div class="px-1">•</div>            
          <v-btn text x-small class="text-caption">服务条款</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog
      v-model="dialog.login"
      :fullscreen="breakpoint.name === 'xs'"
      max-width="440"
      :transition="
        breakpoint.name === 'xs'
          ? 'dialog-bottom-transition'
          : 'scale-transition'
      "
      overlay-color="white"
      overlay-opacity="0.9"
      ><Login
    /></v-dialog>
    <v-dialog
      v-model="dialog.register"
      :fullscreen="breakpoint.name === 'xs'"
      max-width="440"
      :transition="
        breakpoint.name === 'xs'
          ? 'dialog-bottom-transition'
          : 'scale-transition'
      "
      overlay-color="white"
      overlay-opacity="0.9"
      ><Register
    /></v-dialog>
  </v-app-bar>
</template>

<script>
import { reactive, provide, inject } from "vue";
import Login from "@/components/users/forms/Login";
import Register from "@/components/users/forms/Register";
import useLogout from "@/composables/users/forms/useLogout";
import useShortName from "@/composables/global/useShortName";
import AvatarContainer from "@/components/users/profile/AvatarContainer";

import {
  mdiAccount,
  mdiLoginVariant,
  mdiLogoutVariant,
  mdiAccountPlusOutline,
  mdiAccountOutline,
  mdiMessageAlertOutline,
} from "@mdi/js";

export default {
  components: { Login, Register, AvatarContainer },
  setup() {
    const { doLogout } = useLogout();
    const dialog = reactive({
      login: false,
      register: false,
    });
    provide("closeDialog", (type) => (dialog[type] = false));
    provide("openDialog", (type) => (dialog[type] = true));
    const global = inject("global"); // global status
    return { global, dialog, doLogout, useShortName };
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
      icons: {
        mdiAccount,
        mdiLoginVariant,
        mdiLogoutVariant,
        mdiAccountPlusOutline,
        mdiAccountOutline,
        mdiMessageAlertOutline,
      },
    };
  },
};
</script>
<style scoped>
.overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>