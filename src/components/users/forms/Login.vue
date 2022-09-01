<template>
  <v-card height="338px" class="pa-11 d-flex flex-column justify-space-between">
    <div>
      <v-card-title class="pa-0"> [LOGO] </v-card-title>
      <v-window v-model="formStatus.windowStep">
        <v-window-item :value="0">
          <div class="font-weight-bold text-h5 pt-2">登录</div>
          <v-form v-model="formStatus.emailFormValid">
            <v-card-text class="pa-0">
              <v-text-field
                v-model="userData.email"
                :rules="[formRules.required, formRules.email]"
              ></v-text-field>
            </v-card-text>
          </v-form>
          <div class="text-body-2 py-1">
            <span>没有账户？</span>
            <span class="goto-register" @click="closeDialog('login'), openDialog('register')">创建一个</span>
          </div>
        </v-window-item>
        <v-window-item :value="1">
          <v-form v-model="formStatus.passwordFormValid">
            <v-card-text class="px-6">
              <v-text-field
                v-model="userData.password"
                label="密码"
                type="password"
                :rules="[formRules.required, formRules.password]"
              ></v-text-field>
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
                <v-otp-input length="6" @finish="doLogin"></v-otp-input>
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
      </v-window>
    </div>
    <v-card-actions class="px-0 py-1">
      <v-btn
        v-if="formStatus.windowStep !== 0"
        text
        @click="formStatus.windowStep -= 1"
        >上一步</v-btn
      >
      <v-spacer></v-spacer>
      <v-btn
        v-if="formStatus.windowStep !== 2"
        @click="
          (formStatus.windowStep === 0
            ? !formStatus.emailFormValid
            : !formStatus.passwordFormValid)
            ? ''
            : (formStatus.windowStep += 1)
        "
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
import useLogin from "@/composables/users/forms/useLogin";
import useForms from "@/composables/users/forms/useForms";

export default {
  setup() {
    const { formRules } = useForms();
    const closeDialog = inject("closeDialog");
    const openDialog = inject("openDialog");
    const { userData, formStatus, doLogin } = useLogin();
    return { closeDialog, openDialog, userData, formStatus, formRules, doLogin };
  },
};
</script>
<style scoped>
.goto-register {
  color: #0067bf;
  cursor: pointer;
}
</style>