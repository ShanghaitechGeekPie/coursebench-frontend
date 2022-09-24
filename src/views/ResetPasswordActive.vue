<template>
  <div>
    <div v-if="$vuetify.breakpoint.xsOnly">
      <div class="main-card" style="min-width: 300px">
        <div class="d-flex justify-center">
          <div v-if="!status.inputFinished"
            class="loading-container-mobile d-flex justify-center"
          >
            <div class="d-flex justify-center flex-column">
              <div class="d-flex justify-center flex-column">
                <v-icon size="128">
                  {{ statics.icons.mdiKeyVariant }}
                </v-icon>   
              </div> 
            </div> 
          </div>           
          <div v-else-if="status.loading"
            class="loading-container-mobile d-flex justify-center"
          >
            <div class="d-flex justify-center flex-column">
              <v-progress-circular 
                indeterminate 
                size="128"
                width="8"
                color="primary"
              ></v-progress-circular>
            </div> 
          </div> 
          <v-icon v-else-if="status.errorMessage == ''" size="160" color="success">
            {{ statics.icons.mdiCheckboxMarkedCircleOutline }}
          </v-icon>
          <v-icon v-else size="160" color="error">
            {{ statics.icons.mdiCloseCircleOutline }}
          </v-icon>
        </div>
        <div>
          <div v-if="!status.inputFinished">
            <div class="text-h5 pt-6 d-sm-block d-flex justify-center">
              <div>重置密码</div>
            </div>
            <v-form v-model="status.passwordFormValid" @submit="$event.preventDefault(), doResetPasswordActive()">
              <v-text-field
                v-model="userData.password"
                :type="status.passwordVisible ? 'text' : 'password'"
                :rules="[formRules.required, formRules.password]"
                ref="passwordTextField"
                :append-icon="
                  status.passwordVisible
                    ? statics.icons.mdiEyeOff
                    : statics.icons.mdiEye
                "
                @click:append="
                  status.passwordVisible = !status.passwordVisible
                "
              ></v-text-field>
            </v-form>                  
          </div>          
          <div v-else-if="status.loading">
            <div class="text-h4 pt-6 text-center">正在加载中...</div>
            <div class="pt-6 word-wrap text-center">
              您的密码即将完成重置，请稍等。
            </div>
          </div>
          <div v-else-if="status.errorMessage == ''">
            <div class="text-h4 pt-6 text-center">密码重置成功!</div>
            <div class="pt-6 word-wrap text-center">
              您的密码已经重置成功，感谢您使用本系统。
            </div>
          </div>
          <div v-else>
            <div class="text-h4 pt-6 text-center">发生错误!</div>
            <div class="pt-6 word-wrap text-center">
              {{ status.errorMessage }}，请稍后重试。
            </div>
          </div>
          <div v-if="!status.loading" class="d-flex justify-center pt-16">
            <v-btn
              width="90px"
              elevation="1"
              color="primary"
              @click="doResetPasswordActive()"
              v-if="!status.inputFinished"
            >
              下一步
            </v-btn>                
            <v-btn
              width="90px"
              elevation="1"
              color="primary"
              @click="$router.push('/')"
              v-else
            >
              返回首页
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div
      :style="{ background: $vuetify.theme.isDark ? '' : '#f9f9f9', 'min-height': '100%' }"
      v-else
    >
      <v-sheet
        :color="$vuetify.theme.isDark ? statics.backgroundDark : statics.backgroundLight"
        :height="$vuetify.breakpoint.xsOnly ? 91 : '40vh'"
      ></v-sheet>
      <v-fade-transition>
        <div class="main-card">
          <v-card
            width="600px"
            height="400px"
            elevation="2"
            class="d-flex justify-space-between flex-column"
          >
            <div class="px-16 pt-16 d-flex">
              <div style="height: 100%">
                <div v-if="!status.inputFinished"
                  class="loading-container d-flex justify-center"
                >
                  <div class="d-flex justify-center flex-column">
                    <v-icon size="100">
                      {{ statics.icons.mdiKeyVariant }}
                    </v-icon>   
                  </div> 
                </div>                               
                <div v-else-if="status.loading"
                  class="loading-container d-flex justify-center"
                >
                  <div class="d-flex justify-center flex-column">
                    <v-progress-circular 
                      indeterminate 
                      size="100"
                      width="8"
                      color="primary"
                    ></v-progress-circular>
                  </div> 
                </div>              
                <v-icon
                  v-else-if="status.errorMessage == ''"
                  size="128"
                  color="success"
                >
                  {{ statics.icons.mdiCheckboxMarkedCircleOutline }}
                </v-icon>
                <v-icon v-else size="128" color="error">
                  {{ statics.icons.mdiCloseCircleOutline }}
                </v-icon>
              </div>
              <div
                class="pl-6 d-flex justify-space-between flex-column"
                style="max-width: 344px; height: 100%; width: 100%"
              >
                <div v-if="!status.inputFinished">
                  <div class="text-h5 pt-6">重置密码</div>
                  <v-form v-model="status.passwordFormValid" @submit="$event.preventDefault(), doResetPasswordActive()">
                    <v-text-field
                      class="mr-4"
                      v-model="userData.password"
                      :type="status.passwordVisible ? 'text' : 'password'"
                      :rules="[formRules.required, formRules.password]"
                      ref="passwordTextField"
                      :append-icon="
                        status.passwordVisible
                          ? statics.icons.mdiEyeOff
                          : statics.icons.mdiEye
                      "
                      @click:append="
                        status.passwordVisible = !status.passwordVisible
                      "
                    ></v-text-field>
                  </v-form>                  
                </div>
                <div v-else-if="status.loading">
                  <div class="text-h4 pt-6">正在加载中...</div>
                  <div class="pt-6 word-wrap">
                    您的密码即将完成重置，请稍等。
                  </div>
                </div>            
                <div v-else-if="status.errorMessage == ''">
                  <div class="text-h4 pt-6">密码重置成功!</div>
                  <div class="pt-6 word-wrap">
                    您的密码已经重置成功，感谢您使用本系统。
                  </div>
                </div>
                <div v-else>
                  <div class="text-h4 pt-6">发生错误!</div>
                  <div class="pt-6 word-wrap">
                    {{ status.errorMessage }}
                  </div>
                </div>
              </div>
            </div>
            <div class="px-16 pb-16 d-flex justify-end">
              <div class="d-flex justify-end pb-6 pr-4">
                <v-btn
                  width="90px"
                  elevation="1"
                  color="primary"
                  @click="doResetPasswordActive()"
                  v-if="!status.inputFinished"
                >
                  下一步
                </v-btn>                
                <v-btn
                  width="90px"
                  elevation="1"
                  color="primary"
                  @click="$router.push('/')"
                  v-else
                >
                  返回首页
                </v-btn>
              </div>
            </div>
          </v-card>
        </div>
      </v-fade-transition>
    </div>
  </div>
</template>

<script>
import useResetPasswordActive from "@/composables/users/useResetPasswordActive";
import useForms from "@/composables/users/forms/useForms";

export default {
  setup() {
    const { formRules } = useForms();
    const { statics, status, userData, doResetPasswordActive } = useResetPasswordActive();

    return { statics, status, userData, doResetPasswordActive, formRules };
  },
};
</script>

<style scoped>
.main-card {
  position: absolute;
  left: 50%;
  top: 45%;
  transform: translate(-50%, -50%);
}

.word-wrap {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}

.loading-container {
  width: 128px;
  height: 128px;
}

.loading-container-mobile {
  width: 160px;
  height: 160px;
}
</style>
