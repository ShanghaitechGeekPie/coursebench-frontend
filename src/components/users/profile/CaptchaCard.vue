<template>
  <v-card>
    <v-card-title class="px-8">修改密码</v-card-title>
    <v-card-text class="px-6 py-0">
      <v-row>
        <v-col cols="12" sm="4" offset-sm="4">
          <v-img
            src="https://www.yishuzi.cn/image.png?fsize=100&font=mlmm.ttf&text=1234"
          ></v-img>
        </v-col>
        <v-col cols="12" sm="6" offset-sm="3" class="py-sm-3 py-0">
          <v-otp-input length="4" @finish="doEditPassword($event, password)"></v-otp-input>
        </v-col>
      </v-row>
      <v-overlay absolute :value="status.loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-overlay>
    </v-card-text>
    <v-card-actions class="px-3">
      <v-btn text @click="$emit('back')">上一步</v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="status.editProfile = false">取消</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import useCaptchaCard from "@/composables/users/profile/useCaptchaCard";

export default {
  setup() {
    const { status, doEditPassword } = useCaptchaCard();
    return { status, doEditPassword }
  }, 
  props: {
    password: Object, 
  }, 
}
</script>