<template>
  <v-dialog max-width="600" v-model="status.editPassword">
    <v-card>
      <v-card-title>修改密码</v-card-title>
      <v-window v-model="status.step">
        <v-window-item :value="0">
          <v-card-text class="px-6 py-sm-4 py-0">
            <v-row>
              <v-col cols="12" class="py-sm-3 py-0">
                <v-text-field label="旧密码" type="password" v-model="status.password.oldPassword"></v-text-field>
              </v-col>
              <v-col cols="12" class="py-sm-3 py-0">
                <v-text-field
                  label="新密码"
                  type="password"
                  v-model="status.password.newPassword"
                  class="pt-sm-3 pt-0"
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="py-sm-3 py-0">
                <v-text-field
                  label="确认密码"
                  type="password"
                  v-model="status.password.repPassword"
                  class="pt-sm-3 pt-0"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="doReset()">取消</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="status.step++">下一步</v-btn>
          </v-card-actions>
        </v-window-item>
        <v-window-item :value="1">
          <v-card-text class="px-6 py-sm-4 py-0">
            <v-row>
              <v-col cols="12" sm="4" offset-sm="4">
                <v-img src="https://www.yishuzi.cn/image.png?fsize=100&font=mlmm.ttf&text=1234"></v-img>
              </v-col>
              <v-col cols="12" sm="6" offset-sm="3" class="py-sm-3 py-0">
                <v-otp-input></v-otp-input>
              </v-col>
            </v-row>
            <v-overlay absolute :value="status.loading">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-overlay>
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="status.step--">上一步</v-btn>
            <v-spacer></v-spacer>
            <v-btn text @click="doReset()">取消</v-btn>
          </v-card-actions>
        </v-window-item>
      </v-window>
    </v-card>
  </v-dialog>
</template>
<script>
import useEditPassword from "@/composables/users/profile/useEditPassword";

export default {
  setup() {
    const { status, doReset, doEditPassword } = useEditPassword();
    return { status, doReset, doEditPassword };
  },
};
</script>