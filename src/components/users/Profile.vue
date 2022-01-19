<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="7" class="pt-0">
        <profile-on-desktop v-if="isMobile ^ 1"></profile-on-desktop>
        <v-card v-if="isMobile"></v-card>
      </v-col>
    </v-row>
    <v-dialog max-width="600" v-model="status.dialog">
      <v-card>
        <v-card-text>
          <v-list class="pt-8">
            <v-list-item class="pb-2 px-4">
              <span class="font-weight-black pr-14">旧密码</span>
              <v-text-field
                single-line
                dense
                clearable
                v-model="status.oldKwd"
                class="pt-0 pl-0"
                type="password"
              ></v-text-field>
            </v-list-item>
            <v-list-item class="pb-2 px-4">
              <span class="font-weight-black pr-14">新密码</span>
              <v-text-field
                single-line
                dense
                clearable
                v-model="status.newKwd"
                class="pt-0 pl-0"
                type="password"
              ></v-text-field>
            </v-list-item>
            <v-list-item class="pb-2 px-4">
              <span class="font-weight-black pr-10">确认密码</span>
              <v-text-field
                single-line
                dense
                clearable
                v-model="status.reptKwd"
                class="pt-0 pl-0"
                type="password"
              ></v-text-field>
            </v-list-item>
            <v-list-item>
              <v-img
                src="https://www.yishuzi.cn/image.png?fsize=100&font=mlmm.ttf&text=1234"
                max-width="100"
                max-height="40"
              ></v-img>
            </v-list-item>
            <v-list-item>
              <span class="font-weight-black pr-14">验证码</span>
              <v-text-field
                single-line
                dense
                clearable
                v-model="status.captcha"
                class="pt-0 pl-0"
                type="password"
              ></v-text-field>
            </v-list-item>
          </v-list>
          <div class="d-flex justify-end">
            <div class="pr-4">
              <v-btn color="primary" @click="status.handin()"> 提交 </v-btn>
            </div>
            <div>
              <v-btn @click="status.abort()"> 取消 </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import userProfile from "@/composables/users/useProfile";
import ProfileOnDesktop from "./ProfileOnDesktop.vue";

export default {
  setup() {
    const { userinfo, status } = userProfile();
    return { userinfo, status };
  },

  components: {
    ProfileOnDesktop,
  },
  computed: {
    isMobile: {
      get() {
        switch (this.$vuetify.breakpoint.name) {
          case "xs":
            return true;
          default:
            return false;
        }
      },
    },
  },
};
</script>