<template>
  <v-card>
    <v-card-title>注册</v-card-title>
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
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="userData.username" label="用户名" :rules="[formRules.required, formRules.username]"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="userData.year" :items="userData.yearItems" label="入学时间"></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select v-model="userData.grade" :items="userData.gradeItems" label="年级"></v-select>
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
                  :rules="[formRules.required, (value) => value === userData.password || '两次输入的密码不一致']"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-window-item>
      <v-window-item :value="2">
        <v-card-text class="px-6">
          <v-row>
            <v-col cols="12" sm="4" offset-sm="4">
              <v-img src="https://www.yishuzi.cn/image.png?fsize=100&font=mlmm.ttf&text=1234"></v-img>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-otp-input length="4" @finish="doRegister"></v-otp-input>
            </v-col>
          </v-row>
          <v-overlay absolute :value="formStatus.loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-overlay>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="3">
        <v-card-text class="px-6 text-center">
          <v-img class="mb-4" contain height="128" src="https://cdn.vuetifyjs.com/images/logos/v.svg"></v-img>
          <h3 class="text-h6 font-weight-light">欢迎来到 CourseBench</h3>
          <span class="text-caption grey--text">激活邮件已发送至您的邮箱，请点击其中的激活链接以激活您的帐号</span>
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn v-if="formStatus.windowStep != 0 && formStatus.windowStep != 3" text @click="formStatus.windowStep -= 1">上一步</v-btn>
      <v-spacer></v-spacer>
      <v-btn
        v-if="formStatus.windowStep <= 1"
        @click="formStatus.windowStep += 1"
        text
        :disabled="formStatus.windowStep === 0 ? !formStatus.emailFormValid : !formStatus.passwordFormValid"
      >
        下一步
      </v-btn>
      <v-btn v-if="formStatus.windowStep == 3" color="primary" @click="closeDialog('register')">完成</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { inject } from "vue"
import useRegister from "@/composables/users/forms/useRegister"
import useForms from "@/composables/users/forms/useForms"

export default {
  setup() {
    const { formRules } = useForms()
    const closeDialog = inject("closeDialog")
    const { userData, formStatus, doRegister } = useRegister()
    return { userData, formStatus, formRules, closeDialog, doRegister }
  }
}
</script>
