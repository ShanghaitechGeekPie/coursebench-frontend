<template>
  <v-card
    height="338px"
    :loading="formStatus.loading"
    style="overflow-y: hidden"
    :class="
      breakpoint.name === 'xs' ? '' : 'd-flex justify-space-between flex-column'
    "
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
    <v-window v-model="formStatus.windowStep" touchless
      style="height: 100%"
    >
      <v-window-item :value="0" style="height: 100%">
        <v-card-text
          class="px-6 px-sm-11 py-0 d-flex justify-sm-space-between flex-column"
          style="height: 100%; max-height: 338px"
        >
          <div>
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
              <span>没有账号？</span>
              <span
                class="inline-link"
                @click="closeDialog('login'), openDialog('register')"
                >创建一个</span
              >
            </div>
          </div>
          <div
            class="px-0 pt-0 pb-6 pb-sm-11 pt-8 pt-sm-0 d-flex justify-end"
          >
            <v-btn
              @click="clickNextStep()"
              elevation="0"
              class="px-8"
              color="primary"
            >
              下一步
            </v-btn>
          </div>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="1" style="height: 100%">
        <v-card-text           
          class="px-6 px-sm-11 py-0 d-flex justify-sm-space-between flex-column"
          style="height: 100%; max-height: 338px"
        >
          <div>
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
          </div>
          <div
            class="px-0 pt-0 pb-6 pb-sm-11 pt-8 pt-sm-0 d-flex justify-end"
          >
            <v-btn
              @click="clickNextStep()"
              elevation="0"
              class="px-8"
              color="primary"
            >
              下一步
            </v-btn>
          </div>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="2" style="height: 100%">
        <v-card-text  
          class="px-6 px-sm-11 py-0 d-flex justify-sm-space-between flex-column"
          style="height: 100%; max-height: 338px"
        > 
          <div>
            <div class="text-body-2 py-2 overflow-ellipsis">
              <v-btn icon x-small @click="clickLastStep()">
                <v-icon>
                  {{ statics.icons.mdiArrowLeft }}
                </v-icon>
              </v-btn>
              {{ userData.email }}
            </div>
            <div class="text-body-2 py-0" v-if="
              (!formStatus.loading) && 
              (!formStatus.captchaLoading) && 
              (formStatus.captchaBase64 !== '')"
            >
              <span>看不清？</span>
              <span class="inline-link" @click="getCaptcha()"
              >点击刷新</span>
            </div>
            <div v-else style="height: 20px; width: 100%;"></div>
            <div class="d-flex justify-center pt-4 pt-sm-3">
              <div style="width: 200px" class="d-flex justify-center">
                <div v-if="formStatus.captchaLoading">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="48"
                  ></v-progress-circular>
                </div>
                <div v-else-if="formStatus.captchaBase64 === ''">
                  <div>验证码获取失败</div>
                  <div class="inline-link d-flex justify-center"
                    @click="getCaptcha()"
                  >点击重试</div>
                </div>
                <v-img                  
                  :src="`data:image/png;base64,${formStatus.captchaBase64}`"
                  v-else
                ></v-img>
              </div>
            </div>  
          </div>
          <div class="pb-6 pb-sm-11 pt-4 pt-sm-0">
            <v-otp-input
              length="6"
              v-model="userData.captcha"
              @finish="doLogin"
            ></v-otp-input>
          </div>                  
        </v-card-text>
      </v-window-item>
    </v-window>
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
            }, { retry: true, timeout: 300 }
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
    }, { retry: true });
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