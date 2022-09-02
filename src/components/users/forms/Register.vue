<template>
  <v-card height="338px" :loading="formStatus.loading"
    style="overflow-y: hidden;"
  >
    <v-card-title
      class="pt-6 pt-sm-11 px-6 px-sm-11 pb-0 d-flex justify-space-between"
    >
      <div>!!LOGO!!</div>
      <div>
        <v-btn
          icon
          style="transform: translate(0, -1px)"
          @click="closeDialog('login')"
          v-if="breakpoint.name === 'xs'"
        >
          <v-icon>{{ statics.icons.mdiWindowClose }}</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-window v-model="formStatus.windowStep">
      <div
        class="px-6 px-sm-11 py-0 d-flex flex-column justify-space-between"
        style="height: 100%; max-height: 338px"
      >      
        <v-window-item :value="0">
          <div class="font-weight-bold text-h5 pt-2">登录</div>
          <v-form v-model="formStatus.emailFormValid">
            <v-card-text class="pa-0">
              <v-text-field
                v-model="userData.email"
                :rules="[formRules.required, formRules.email]"
                ref="emailTextField"
              ></v-text-field>
            </v-card-text>
          </v-form>
          <div class="text-body-2 py-1">
            <span>没有账户？</span>
            <span
              class="inline-link"
              @click="closeDialog('login'), openDialog('register')"
              >创建一个</span
            >
          </div>
        </v-window-item>
        <v-window-item :value="1">
          <v-form v-model="formStatus.passwordFormValid">
            <v-card-text class="px-6">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="userData.username"
                    label="用户名"
                    :rules="[formRules.required, formRules.username]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="userData.year"
                    :items="userData.yearItems"
                    label="入学时间"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    v-model="userData.grade"
                    :items="userData.gradeItems"
                    label="年级"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="userData.password"
                    label="密码"
                    type="password"
                    :rules="[formRules.required, formRules.password]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="userData.confirmPassword"
                    label="确认密码"
                    type="password"
                    :rules="[
                      formRules.required,
                      (value) =>
                        value === userData.password || '两次输入的密码不一致',
                    ]"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
          </v-form>
        </v-window-item>
        <v-window-item :value="2">
          <v-card-text class="px-6">
            <v-row>
              <v-col cols="12" sm="6" offset-sm="3">
                <v-img
                  :src="`data:image/png;base64,${formStatus.captchaBase64}`"
                ></v-img>
              </v-col>
              <v-col cols="12" sm="8" offset-sm="2">
                <v-otp-input length="6" @finish="doRegister"></v-otp-input>
              </v-col>
            </v-row>
            <v-overlay absolute :value="formStatus.loading">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-overlay>
          </v-card-text>
        </v-window-item>
        <v-window-item :value="3">
          <v-card-text class="px-6 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            ></v-img>
            <h3 class="text-h6 font-weight-light">欢迎来到 CourseBench</h3>
            <span class="text-caption grey--text"
              >激活邮件已发送至您的邮箱，请点击其中的激活链接以激活您的帐号</span
            >
          </v-card-text>
        </v-window-item>
      </div>
    </v-window>
    <v-card-actions
      class="px-6 px-sm-11 pb-6 pb-sm-11 py-1 d-flex justify-end"
      v-if="formStatus.windowStep !== 2"
    >
      <v-btn
        @click="clickNextStep()"
        elevation="0"
        class="px-8"
        color="primary"
      >
        下一步
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { inject } from "vue";
import useRegister from "@/composables/users/forms/useRegister";
import useForms from "@/composables/users/forms/useForms";

export default {
  setup() {
    const { formRules } = useForms();
    const closeDialog = inject("closeDialog");
    const openDialog = inject("openDialog");
    const { userData, formStatus, doRegister } = useRegister();
    return { userData, formStatus, formRules, closeDialog, doRegister };
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
    };
  },
};
</script>
