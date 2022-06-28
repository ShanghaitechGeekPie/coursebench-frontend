<template>
  <v-app-bar app>
    <v-btn text to="/">Homo</v-btn>
    <v-btn text to="/course/0">课程</v-btn>
    <v-btn text to="/exit">这些按钮是临时的</v-btn>
    <v-spacer></v-spacer>
    <v-menu left bottom offset-y transition="slide-y-transition">
      <template #activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar color="grey darken-1">
            <v-icon size="32">{{ icons.mdiAccount }}</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list close-on-click>
        <v-list-item link @click="dialog.login = true">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiLoginVariant }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>登录</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="dialog.register = true">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiAccountPlusOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>注册</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/user">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiAccountOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>个人中心</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>{{ icons.mdiMessageAlertOutline }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>反馈</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="doLogout()">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiLogoutVariant }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>注销</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-dialog v-model="dialog.login" max-width="600"><Login /></v-dialog>
    <v-dialog v-model="dialog.register" max-width="600"><Register /></v-dialog>
  </v-app-bar>
</template>

<script>
import { reactive, provide } from "@vue/composition-api"
import Login from "@/components/users/forms/Login.vue"
import Register from "@/components/users/forms/Register.vue"
import useLogout from "@/composables/users/forms/useLogout"

import {
  mdiAccount,
  mdiLoginVariant,
  mdiLogoutVariant,
  mdiAccountPlusOutline,
  mdiAccountOutline,
  mdiMessageAlertOutline
} from "@mdi/js"

export default {
  components: { Login, Register },
  setup() {
    const { doLogout } = useLogout()
    const dialog = reactive({ login: false, register: false })
    provide("closeDialog", (type) => (dialog[type] = false))
    return { dialog, doLogout }
  },
  data() {
    return {
      icons: {
        mdiAccount,
        mdiLoginVariant,
        mdiLogoutVariant,
        mdiAccountPlusOutline,
        mdiAccountOutline,
        mdiMessageAlertOutline
      }
    }
  }
}
</script>
