<template>
  <v-card>
    <v-card-title>登录</v-card-title>
    <v-window v-model="formStatus.windowStep">
      <v-window-item :value="0">
        <v-form v-model="formStatus.emailFormValid">
          <v-card-text class="px-6">
            <v-text-field v-model="userData.email" label="邮箱" :rules="[formRules.required, formRules.email]"></v-text-field>
          </v-card-text>
        </v-form>
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
              <v-img :src="`data:image/png;base64,${formStatus.captchaBase64}`"></v-img>
            </v-col>
            <v-col cols="12" sm="8" offset-sm="2">
              <v-otp-input length="6" @finish="doLogin"></v-otp-input>
            </v-col>
          </v-row>
          <v-overlay absolute :value="formStatus.loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-overlay>
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn v-if="formStatus.windowStep !== 0" text @click="formStatus.windowStep -= 1">上一步</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="formStatus.windowStep !== 2"
        @click="formStatus.windowStep += 1"
        text
        :disabled="formStatus.windowStep === 0 ? !formStatus.emailFormValid : !formStatus.passwordFormValid"
      >
        下一步
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import useLogin from "@/composables/users/forms/useLogin"
import useForms from "@/composables/users/forms/useForms"

export default {
  setup() {
    const { formRules } = useForms()
    const { userData, formStatus, doLogin, getCaptcha } = useLogin()
    getCaptcha()
    return { userData, formStatus, formRules, doLogin }
  }
}
</script>
