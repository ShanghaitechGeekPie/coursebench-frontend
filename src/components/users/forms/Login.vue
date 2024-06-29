<template>
  <v-card
    :loading="formStatus.loading"
    style="overflow-y: hidden"
    :class="
      $vuetify.breakpoint.name === 'xs'
        ? ''
        : 'd-flex justify-space-between flex-column'
    "
  >
    <v-card-title
      class="pt-6 pt-sm-11 px-6 px-sm-11 pb-0 d-flex justify-space-between"
    >
      <div>
        <img
          class="small-icon"
          :src="$vuetify.theme.dark ? logoDark : logoLight"
          alt=""
        />
      </div>
      <div>
        <v-btn
          icon
          style="transform: translate(0, -1px)"
          @click="closeDialog('login')"
          v-if="$vuetify.breakpoint.name === 'xs'"
        >
          <v-icon>{{ statics.icons.mdiWindowClose }}</v-icon>
        </v-btn>
      </div>
    </v-card-title>
    <v-window v-model="formStatus.windowStep" touchless style="height: 100%">
      <v-window-item :value="0" style="height: 100%">
        <v-card-text
          class="px-6 px-sm-11 py-0 d-flex justify-sm-space-between flex-column"
          style="height: 100%; min-height: 262px"
        >
          <div>
            <div class="font-weight-bold text-h5 pt-2">登录</div>
            <v-form
              v-model="formStatus.emailFormValid"
              @submit="$event.preventDefault(), clickNextStep()"
            >
              <v-card-text class="pa-0">
                <v-text-field
                  v-model="userData.email"
                  :rules="[formRules.required, formRules.email]"
                  placeholder="请输入上科大邮箱"
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
          <div class="px-0 pt-0 pb-6 pb-sm-11 pt-8 pt-sm-0 d-flex justify-end">
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
          style="height: 100%; min-height: 262px"
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
            <v-form
              v-model="formStatus.passwordFormValid"
              @submit="$event.preventDefault(), clickNextStep()"
            >
              <v-card-text class="pa-0">
                <v-text-field v-model="userData.email" class="fake-input">
                </v-text-field>
                <v-text-field
                  v-model="userData.password"
                  :type="formStatus.passwordVisible ? 'text' : 'password'"
                  :rules="[formRules.required, formRules.password]"
                  ref="passwordTextField"
                  placeholder="请输入密码"
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
              <span
                class="inline-link"
                @click="
                  (formStatus.windowStep = 2),
                    (formStatus.isResetPassword = true)
                "
                >忘记了密码？</span
              >
            </div>
          </div>
          <div class="px-0 pt-0 pb-6 pb-sm-11 pt-8 pt-sm-0 d-flex justify-end">
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
          style="height: 100%; min-height: 262px"
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
            <div class="text-body-1 mt-n2">
              你希望以何种方式获取你的安全代码?
            </div>
            <v-card-text class="pa-0">
              <v-radio-group v-model="userData.resetPasswordMethod">
                <v-radio value="email" class="black--text">
                  <template v-slot:label>
                    <div
                      :class="[
                        $vuetify.theme.dark ? 'white--text' : 'black--text',
                      ]"
                    >
                      通过电子邮件发送安全代码
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
              <div class="text-body-2 py-1 mt-n2">
                <span>没有账号？</span>
                <span
                  class="inline-link"
                  @click="closeDialog('login'), openDialog('register')"
                  >创建一个</span
                >
              </div>
            </v-card-text>
          </div>
          <div class="px-0 pt-0 pb-6 pb-sm-11 pt-8 pt-sm-0 d-flex justify-end">
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
      <v-window-item :value="3" style="height: 100%">
        <v-card-text
          class="px-6 px-sm-11 py-0 d-flex justify-sm-space-between flex-column"
          style="height: 100%; min-height: 262px"
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
            <div
              class="text-body-2 py-0"
              v-if="
                !formStatus.loading &&
                !formStatus.captchaLoading &&
                formStatus.captchaBase64 !== ''
              "
            >
              <span>看不清？</span>
              <span class="inline-link" @click="getCaptcha()">点击刷新</span>
            </div>
            <div v-else style="height: 20px; width: 100%"></div>
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
                  <div
                    class="inline-link d-flex justify-center inline-link"
                    @click="getCaptcha()"
                  >
                    点击重试
                  </div>
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
              type="number"
              v-model="userData.captcha"
              @finish="
                formStatus.isResetPassword ? doResetPassword() : doLogin()
              "
              ref="captchaOptInput"
            ></v-otp-input>
          </div>
        </v-card-text>
      </v-window-item>
      <v-window-item :value="4" style="height: 100%">
        <v-card-text
          class="px-6 px-sm-11 py-0 d-flex justify-sm-space-between flex-column"
          style="height: 100%; min-height: 262px"
        >
          <div class="text-h5 py-2 overflow-ellipsis">还差最后一步</div>
          <div class="d-flex justify-center py-sm-0 py-4">
            <v-icon size="120" color="info">
              {{ statics.icons.mdiEmailAlertOutline }}
            </v-icon>
          </div>
          <div
            class="px-0 pt-0 pb-6 pb-sm-11 pt-4 pt-sm-0 d-flex flex-column justify-end"
          >
            <div class="text-body-1">
              重置密码的邮件已发送至您的邮箱，请点击其中的激活链接以重置您的密码
            </div>
          </div>
        </v-card-text>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import { inject } from 'vue';
import useLogin from '@/composables/users/forms/useLogin';
import useForms from '@/composables/users/forms/useForms';
import useAfterRender from '@/composables/global/useAfterRender';
import logoDark from '@/assets/logo-white.svg';
import logoLight from '@/assets/logo.svg';

export default {
  setup() {
    const { formRules } = useForms();
    const closeDialog = inject('closeDialog');
    const openDialog = inject('openDialog');
    const {
      statics,
      userData,
      formStatus,
      doLogin,
      getCaptcha,
      doResetPassword,
    } = useLogin();
    return {
      closeDialog,
      openDialog,
      statics,
      userData,
      formStatus,
      formRules,
      doLogin,
      getCaptcha,
      doResetPassword,
      logoDark,
      logoLight,
    };
  },
  methods: {
    clickLastStep() {
      if (this.formStatus.windowStep === 2) {
        this.formStatus.windowStep -= 1;
        this.formStatus.isResetPassword = false;
      } else if (
        this.formStatus.windowStep === 3 &&
        !this.formStatus.isResetPassword
      ) {
        this.formStatus.windowStep = 1;
      } else if (this.formStatus.windowStep > 0) {
        this.formStatus.windowStep -= 1;
      }
    },

    clickNextStep() {
      if (this.formStatus.windowStep === 0 && this.formStatus.emailFormValid) {
        this.formStatus.windowStep += 1;
        // autofocus will break the transition animation, so we do it manually
        useAfterRender(() => this.$refs.passwordTextField.focus(), {
          retry: true,
          timeout: 300,
        });
      } else if (
        this.formStatus.windowStep === 1 &&
        this.formStatus.passwordFormValid
      ) {
        this.formStatus.windowStep = 3;
        useAfterRender(() => this.$refs.captchaOptInput.focus(), {
          retry: true,
          timeout: 300,
        });
      } else if (
        this.formStatus.windowStep === 2 &&
        this.userData.resetPasswordMethod !== ''
      ) {
        this.formStatus.windowStep += 1;
        useAfterRender(() => this.$refs.captchaOptInput.focus(), {
          retry: true,
          timeout: 300,
        });
      }
    },
  },
  mounted() {
    useAfterRender(() => this.$refs.emailTextField.focus(), { retry: true });
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

.small-icon {
  width: 150px;
  height: 100%;
}

.fake-input {
  width: 0;
  height: 0;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  visibility: hidden;
}
</style>
