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
          <div class="text-body-2 py-2 overflow-ellipsis">
            <v-btn icon x-small @click="clickLastStep()">
              <v-icon>
                {{ statics.icons.mdiArrowLeft }}
              </v-icon>
            </v-btn>
            {{ userData.email }}
          </div>
          <div class="font-weight-bold text-h5">输入密码</div>
          <v-form v-model="formStatus.passwordFormValid">
            <v-card-text class="pa-0">
              <v-text-field
                v-model="userData.password"
                :type="formStatus.passwordVisible ? 'text' : 'password'"
                :rules="[formRules.required, formRules.password]"
                ref="passwordTextField"
                :append-icon="
                  formStatus.passwordVisible
                    ? statics.icons.mdiEyeOff
                    : statics.icons.mdiEye
                "
                @click:append="
                  formStatus.passwordVisible = !formStatus.passwordVisible
                "
              ></v-text-field>
            </v-card-text>
          </v-form>
          <div class="text-body-2 py-1">
            <span class="inline-link" @click="">忘记了密码？</span>
          </div>
        </v-window-item>
        <v-window-item :value="2">
          <div class="text-body-2 py-2 overflow-ellipsis">
            <v-btn icon x-small @click="clickLastStep()">
              <v-icon>
                {{ statics.icons.mdiArrowLeft }}
              </v-icon>
            </v-btn>
            {{ userData.email }}
          </div>
          <div class="text-body-2 py-0">
            <span>看不清？</span>
            <span class="inline-link" @click="getCaptcha()">点击刷新</span>
          </div>
          <!-- <div class="font-weight-bold text-h5">输入验证码</div> -->
          <v-card-text class="px-0 pt-2 pb-0">
            <div class="d-flex justify-center">
              <div style="width: 200px" class="d-flex justify-center">
                <v-img
                  :src="`data:image/png;base64,${formStatus.captchaBase64}`"
                ></v-img>
              </div>
            </div>
            <div class="pt-2">
              <v-otp-input
                length="6"
                v-model="userData.captcha"
                @finish="doLogin"
              ></v-otp-input>
            </div>
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
import useLogin from "@/composables/users/forms/useLogin";
import useForms from "@/composables/users/forms/useForms";
import useAfterRender from "@/composables/global/useAfterRender";

export default {
  setup() {
    const { formRules } = useForms();
    const closeDialog = inject("closeDialog");
    const openDialog = inject("openDialog");
    const { statics, userData, formStatus, doLogin, getCaptcha } = useLogin();
    return {
      closeDialog,
      openDialog,
      statics,
      userData,
      formStatus,
      formRules,
      doLogin,
      getCaptcha,
    };
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
    };
  },
  methods: {
    clickLastStep() {
      if (this.formStatus.windowStep > 0) {
        this.formStatus.windowStep -= 1;
      }
    },
    clickNextStep() {
      if (this.formStatus.windowStep === 0) {
        if (!this.formStatus.emailFormValid) {
          return;
        } else {
          this.formStatus.windowStep += 1;
          // autofocus will break the transition animation, so we do it manually
          useAfterRender(
            () => {
              this.$refs.passwordTextField.focus();
            },
            {
              timeout: 300,
            }
          );
        }
      } else if (this.formStatus.windowStep === 1) {
        if (!this.formStatus.passwordFormValid) {
          return;
        } else {
          this.formStatus.windowStep += 1;
        }
      }
    },
  },
  mounted() {
    useAfterRender(() => {
      this.$refs.emailTextField.focus();
    });
  },
};
</script>
<style scoped>
.inline-link {
  color: #0067bf;
  cursor: pointer;
}

.overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>