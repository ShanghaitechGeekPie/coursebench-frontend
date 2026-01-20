<template>
  <div>
    <v-btn
      outlined
      color="primary"
      width="100"
      @click="formStatus.editProfile = true"
    >
      <v-icon size="20">
        {{ statics.icons.mdiAccountEditOutline }}
      </v-icon>
      <span>个人设置</span>
    </v-btn>
    <v-dialog
      v-model="formStatus.editProfile"
      max-width="520"
      :fullscreen="$vuetify.breakpoint.name === 'xs'"
      :transition="
        $vuetify.breakpoint.name === 'xs'
          ? 'dialog-bottom-transition'
          : 'scale-transition'
      "
    >
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
            <v-img
              :src="$vuetify.theme.dark ? logoDark : logoLight"
              width="93.09px"
            >
            </v-img>
          </div>
          <div>
            <v-btn
              icon
              style="transform: translate(0, -1px)"
              @click="formStatus.editProfile = false"
              v-if="$vuetify.breakpoint.name === 'xs'"
            >
              <v-icon>{{ statics.icons.mdiWindowClose }}</v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-window
          v-model="formStatus.windowStep"
          touchless
          style="height: 100%"
        >
          <v-window-item :value="0" style="height: 100%">
            <v-card-text
              class="px-6 px-sm-11 py-0 d-flex justify-sm-space-between flex-column"
              style="height: 100%"
            >
              <div>
                <div class="font-weight-bold text-h5 pt-2">个人信息</div>
                <v-form
                  v-model="formStatus.nicknameFormValid"
                  @submit="$event.preventDefault(), doEditProfile()"
                >
                  <div class="d-flex">
                    <div
                      class="d-flex justify-center flex-column mr-sm-10 mr-6"
                    >
                      <div class="text-body-1 font-weight-bold">用户名</div>
                    </div>
                    <v-text-field
                      v-model="userData.nickname"
                      :rules="[formRules.required, formRules.nickname]"
                    ></v-text-field>
                  </div>
                  <div class="d-flex">
                    <div class="d-flex justify-center flex-column mr-sm-6 mr-2">
                      <div class="text-body-1 font-weight-bold">真实姓名</div>
                    </div>
                    <v-text-field
                      v-model="userData.realname"
                      :rules="[formRules.realname]"
                    ></v-text-field>
                  </div>
                  <div class="d-flex">
                    <div class="d-flex justify-center flex-column mr-sm-6 mr-2">
                      <div class="text-body-1 font-weight-bold">入学时间</div>
                    </div>
                    <v-select
                      v-model="userData.year"
                      :items="yearItems"
                    ></v-select>
                  </div>
                  <div class="d-flex">
                    <div
                      class="d-flex justify-center flex-column mr-sm-14 mr-10"
                    >
                      <div class="text-body-1 font-weight-bold">学段</div>
                    </div>
                    <v-select
                      v-model="userData.grade"
                      :items="gradeItems"
                    ></v-select>
                  </div>
                  <div class="d-flex justify-space-between">
                    <div
                      class="d-flex justify-center flex-column mr-sm-10 mr-6"
                    >
                      <div class="text-body-1 font-weight-bold">可见性</div>
                    </div>
                    <v-select
                      v-model="userData.is_anonymous"
                      :items="visibleItems"
                    ></v-select>
                  </div>
                </v-form>
              </div>
              <div class="px-0 pt-4 pb-6 pb-sm-11 d-flex justify-space-between">
                <div>
                  <v-btn
                    @click="clickNextStep()"
                    elevation="0"
                    class="px-4"
                    color="primary"
                  >
                    修改密码
                  </v-btn>
                </div>
                <div>
                  <v-btn
                    @click="doEditProfile()"
                    elevation="0"
                    class="px-8"
                    color="primary"
                  >
                    保存
                  </v-btn>
                  <v-btn
                    @click="formStatus.editProfile = false"
                    elevation="0"
                    class="px-8 ml-4"
                  >
                    取消
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="1" style="height: 100%">
            <v-card-text
              class="px-6 px-sm-11 py-0 d-flex justify-sm-space-between flex-column"
              style="height: 100%"
            >
              <div>
                <div class="text-body-2 py-2 overflow-ellipsis">
                  <v-btn icon x-small @click="clickLastStep()">
                    <v-icon>
                      {{ statics.icons.mdiArrowLeft }}
                    </v-icon>
                  </v-btn>
                  {{ global.userProfile.email }}
                </div>
                <div class="font-weight-bold text-h5">输入旧密码</div>
                <v-form
                  v-model="formStatus.oldPasswordFormValid"
                  @submit="$event.preventDefault(), clickNextStep()"
                >
                  <v-card-text class="pa-0">
                    <v-text-field
                      v-model="passwordData.oldPassword"
                      :type="
                        formStatus.oldPasswordVisible ? 'text' : 'password'
                      "
                      :rules="[formRules.required, formRules.password]"
                      :append-icon="
                        formStatus.oldPasswordVisible
                          ? statics.icons.mdiEyeOff
                          : statics.icons.mdiEye
                      "
                      ref="oldPasswordTextField"
                      name="current-password"
                      autocomplete="current-password"
                      @click:append="
                        formStatus.oldPasswordVisible =
                          !formStatus.oldPasswordVisible
                      "
                    ></v-text-field>
                  </v-card-text>
                </v-form>
              </div>
              <div class="px-0 pt-4 pb-6 pb-sm-11 d-flex justify-end">
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
              style="height: 100%"
            >
              <div>
                <div class="text-body-2 py-2 overflow-ellipsis">
                  <v-btn icon x-small @click="clickLastStep()">
                    <v-icon>
                      {{ statics.icons.mdiArrowLeft }}
                    </v-icon>
                  </v-btn>
                  {{ global.userProfile.email }}
                </div>
                <div class="font-weight-bold text-h5">输入新密码</div>
                <v-form
                  v-model="formStatus.newPasswordFormValid"
                  @submit="$event.preventDefault(), clickNextStep()"
                >
                  <v-card-text class="pa-0">
                    <v-text-field
                      v-model="passwordData.newPassword"
                      :type="
                        formStatus.newPasswordVisible ? 'text' : 'password'
                      "
                      :rules="[formRules.required, formRules.password]"
                      :append-icon="
                        formStatus.newPasswordVisible
                          ? statics.icons.mdiEyeOff
                          : statics.icons.mdiEye
                      "
                      ref="newPasswordTextField"
                      name="new-password"
                      autocomplete="new-password"
                      @click:append="
                        formStatus.newPasswordVisible =
                          !formStatus.newPasswordVisible
                      "
                    ></v-text-field>
                  </v-card-text>
                </v-form>
              </div>
              <div class="px-0 pt-4 pb-6 pb-sm-11 d-flex justify-end">
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
              style="height: 100%; max-height: 338px"
            >
              <div>
                <div class="text-body-2 py-2 overflow-ellipsis">
                  <v-btn icon x-small @click="clickLastStep()">
                    <v-icon>
                      {{ statics.icons.mdiArrowLeft }}
                    </v-icon>
                  </v-btn>
                  {{ global.userProfile.email }}
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
                  <span class="inline-link" @click="getCaptcha()"
                    >点击刷新</span
                  >
                </div>
                <div v-else style="height: 20px; width: 100%"></div>
                <div class="d-flex justify-center pt-4 pt-sm-3">
                  <div style="width: 200px" class="d-flex justify-center">
                    <div v-if="formStatus.captchaLoading" class="pt-5">
                      <v-progress-circular
                        indeterminate
                        color="primary"
                        size="48"
                      ></v-progress-circular>
                    </div>
                    <div
                      v-else-if="formStatus.captchaBase64 === ''"
                      class="pt-5"
                    >
                      <div>验证码获取失败</div>
                      <div
                        class="inline-link d-flex justify-center inline-link"
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
              <div class="pb-6 pb-sm-11 pt-4 pt-sm-6 d-flex justify-center">
                <v-otp-input
                  length="6"
                  type="number"
                  v-model="passwordData.captcha"
                  @finish="doChangePassword"
                  ref="captchaOptInput"
                  style="max-width: 338px"
                ></v-otp-input>
              </div>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import useEditProfile from '@/composables/users/profile/useEditProfile';
import useForms from '@/composables/users/forms/useForms';
import {
  gradeItems,
  yearItems,
  visibleItems,
} from '@/composables/global/useStaticData';
import useAfterRender from '@/composables/global/useAfterRender';
import { inject } from 'vue';
import logoDark from '@/assets/logo-white.svg';
import logoLight from '@/assets/logo.svg';

export default {
  setup() {
    const {
      statics,
      userData,
      passwordData,
      formStatus,
      doEditProfile,
      doChangePassword,
      getCaptcha,
    } = useEditProfile();
    const { formRules } = useForms();

    const global = inject('global');

    return {
      statics,
      userData,
      passwordData,
      formStatus,
      doEditProfile,
      doChangePassword,
      getCaptcha,
      global,
      formRules,
      gradeItems,
      yearItems,
      visibleItems,
      logoDark,
      logoLight,
    };
  },
  methods: {
    clickLastStep() {
      if (this.formStatus.windowStep > 0) {
        this.formStatus.windowStep -= 1;
      }
    },

    clickNextStep() {
      if (this.formStatus.windowStep === 0 && !this.formStatus.loading) {
        this.formStatus.windowStep += 1;
        this.getCaptcha();
        useAfterRender(() => this.$refs.oldPasswordTextField.focus(), {
          retry: true,
          timeout: 300,
        });
      } else if (
        this.formStatus.windowStep === 1 &&
        this.formStatus.oldPasswordFormValid
      ) {
        this.formStatus.windowStep += 1;
        useAfterRender(() => this.$refs.newPasswordTextField.focus(), {
          retry: true,
          timeout: 300,
        });
      } else if (
        this.formStatus.windowStep === 2 &&
        this.formStatus.newPasswordFormValid
      ) {
        this.formStatus.windowStep += 1;
        useAfterRender(() => this.$refs.captchaOptInput.focus(), {
          retry: true,
          timeout: 300,
        });
      }
    },
  },
};
</script>
<style scoped>
.inline-link {
  color: #0067bf;
  cursor: pointer;
}
</style>
