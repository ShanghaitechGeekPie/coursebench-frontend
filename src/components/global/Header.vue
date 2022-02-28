<template>
  <v-app-bar
    app
    elevate-on-scroll
    elevation="2"
    class="transition-ease"
    :style="{
      background: isScrolled
        ? ''
        : `linear-gradient(rgba(39, 39, 39, ${
            theme.isDark ? 0.9 : 0.3
          }), transparent)`,
    }"
  >
    <v-btn
      text
      to="/"
      :class="[
        isScrolled ? '' : 'white--text',
        'font-weight-bold',
        'text-body-1',
      ]"
      >Homo</v-btn
    >
    <v-btn
      text
      to="/course/0"
      :class="[
        isScrolled ? '' : 'white--text',
        'font-weight-bold',
        'text-body-1',
      ]"
      >课程</v-btn
    >
    <v-btn
      text
      to="/exit"
      :class="[
        isScrolled ? '' : 'white--text',
        'font-weight-bold',
        'text-body-1',
      ]"
      >这些按钮是临时的</v-btn
    >
    <v-spacer></v-spacer>
    <v-menu left bottom offset-y transition="slide-y-transition">
      <template #activator="{ on }">
        <v-btn icon v-on="on">
          <v-avatar color="white">123</v-avatar>
        </v-btn>
      </template>
      <v-list close-on-click>
        <v-list-item link @click="login.dialog = true">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiLoginVariant }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>登录</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="register.dialog = true">
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
    <v-dialog v-model="login.dialog" max-width="600">
      <v-card>
        <v-card-title>登录</v-card-title>
        <v-window v-model="login.step">
          <v-window-item :value="0">
            <v-card-text class="px-6">
              <v-text-field label="邮箱">
                <v-icon slot="append">{{ icons.mdiEmail }}</v-icon>
              </v-text-field>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="1">
            <v-card-text class="px-6">
              <v-text-field label="密码" type="password">
                <v-icon slot="append">{{
                  icons.mdiFormTextboxPassword
                }}</v-icon>
              </v-text-field>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text class="px-6">
              <v-row>
                <v-col cols="12" sm="4" offset-sm="4">
                  <v-img
                    src="https://www.yishuzi.cn/image.png?fsize=100&font=mlmm.ttf&text=1234"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="6" offset-sm="3">
                  <v-otp-input length="4" @finish="doLogin"></v-otp-input>
                </v-col>
              </v-row>
              <v-overlay absolute :value="login.loading">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-overlay>
            </v-card-text>
          </v-window-item>
        </v-window>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn v-if="login.step !== 0" text @click="login.step -= 1"
            >上一步</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn v-if="login.step !== 2" text @click="login.step += 1"
            >下一步</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="register.dialog" max-width="600">
      <v-card>
        <v-card-title>注册</v-card-title>
        <v-window v-model="register.step">
          <v-window-item :value="0">
            <v-card-text class="px-6">
              <v-text-field label="邮箱"></v-text-field>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="1">
            <v-card-text class="px-6">
              <v-row>
                <v-col cols="12">
                  <v-text-field label="用户名"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="register.year"
                    :items="register.year_items"
                    label="入学时间"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="register.grade"
                    :items="register.grade_items"
                    label="年级"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="密码" type="password"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="确认密码" type="password"></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text class="px-6">
              <v-row>
                <v-col cols="12" sm="4" offset-sm="4">
                  <v-img
                    src="https://www.yishuzi.cn/image.png?fsize=100&font=mlmm.ttf&text=1234"
                  ></v-img>
                </v-col>
                <v-col cols="12" sm="6" offset-sm="3">
                  <v-otp-input length="4" @finish="doRegister"></v-otp-input>
                </v-col>
              </v-row>
              <v-overlay absolute :value="register.loading">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-overlay>
            </v-card-text>
          </v-window-item>
        </v-window>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn v-if="register.step !== 0" text @click="register.step -= 1"
            >上一步</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn v-if="register.step !== 2" text @click="register.step += 1"
            >下一步</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import useLogin from "@/composables/users/useLogin";
import useRegister from "@/composables/users/useRegister";
import useLogout from "@/composables/users/useLogout";

import {
  mdiLoginVariant,
  mdiLogoutVariant,
  mdiAccountPlusOutline,
  mdiAccountOutline,
  mdiMessageAlertOutline,
  mdiEmail,
  mdiFormTextboxPassword,
} from "@mdi/js";

export default {
  setup() {
    const { login, doLogin } = useLogin();
    const { register, doRegister } = useRegister();
    const { doLogout } = useLogout();
    return { login, register, doLogin, doRegister, doLogout };
  },
  data() {
    return {
      icons: {
        mdiLoginVariant,
        mdiLogoutVariant,
        mdiAccountPlusOutline,
        mdiAccountOutline,
        mdiMessageAlertOutline,
        mdiEmail,
        mdiFormTextboxPassword,
      },
      isScrolled: 0,
      theme: this.$vuetify.theme,
    };
  },
  mounted() {
    document.addEventListener("scroll", () => {
      this.isScrolled = document.documentElement.scrollTop > 0;
    });
  },
};
</script>
