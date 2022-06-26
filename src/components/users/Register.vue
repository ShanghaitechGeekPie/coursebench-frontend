<template>
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
              <v-select v-model="register.year" :items="register.year_items" label="入学时间"></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-select v-model="register.grade" :items="register.grade_items" label="年级"></v-select>
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
              <v-img src="https://www.yishuzi.cn/image.png?fsize=100&font=mlmm.ttf&text=1234"></v-img>
            </v-col>
            <v-col cols="12" sm="6" offset-sm="3">
              <v-otp-input length="4" @finish="doRegister"></v-otp-input>
            </v-col>
          </v-row>
          <v-overlay absolute :value="register.loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </v-overlay>
        </v-card-text>
      </v-window-item>
    </v-window>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn v-if="register.step !== 0" text @click="register.step -= 1">上一步</v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="register.step !== 2" text @click="register.step += 1">下一步</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import useRegister from "@/composables/users/useRegister"

export default {
  setup() {
    const { register, doRegister } = useRegister()
    return { register, doRegister }
  },
  data() {
    return {
      icons: {}
    }
  }
}
</script>
