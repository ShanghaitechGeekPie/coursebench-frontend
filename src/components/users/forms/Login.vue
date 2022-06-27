<template>
  <v-card>
    <v-card-title>登录</v-card-title>
    <v-window v-model="formStatus.windowStep">
      <v-window-item :value="0">
        <v-card-text class="px-6">
          <v-text-field
            v-model="userData.email"
            label="邮箱"
            :rules="[formRules.required, formRules.email]"
          ></v-text-field>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="1">
        <v-card-text class="px-6">
          <v-text-field
            v-model="userData.password"
            label="密码"
            :rules="[formRules.required, formRules.password]"
          ></v-text-field>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="2">
        <v-card-text class="px-6">
          <v-row>
            <v-col cols="12" sm="4" offset-sm="4">
              <v-img src="https://www.yishuzi.cn/image.png?fsize=100&font=mlmm.ttf&text=1234"></v-img>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-otp-input length="4" @finish="doLogin"></v-otp-input>
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
      <v-btn v-if="formStatus.windowStep !== 2" text @click="formStatus.windowStep += 1">下一步</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import useLogin from "@/composables/users/forms/useLogin"
import useForms from "@/composables/users/forms/useForms"

export default {
  setup() {
    const { userData, formStatus, doLogin } = useLogin()
    const { formRules } = useForms()
    return { userData, formStatus, formRules, doLogin }
  }
}
</script>
