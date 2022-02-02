<template>
  <v-card>
    <v-card-title class="px-sm-8 px-2 pb-sm-4 pb-0">修改用户资料</v-card-title>
    <v-card-text class="px-sm-8 px-2 py-0">
      <v-container>
        <v-row>
          <v-col class="pa-0" cols="12">
            <v-list dense flat class="pa-0">
              <v-list-item class="pb-0 px-0">
                <span
                  class="
                    text-sm-subtitle-1 text-subtitle-2
                    font-weight-bold
                    pr-sm-14 pr-5
                  "
                  >用户名</span
                >
                <v-text-field
                  single-line
                  dense
                  clearable
                  v-model="status.profile.nickname"
                  :class="[
                    'text-sm-body-1',
                    'text-body-2',
                    'pt-2',
                    'pl-0',
                    isMobile ? 'input-limit' : '',
                  ]"
                ></v-text-field>
              </v-list-item>
              <v-list-item class="pb-0 px-0">
                <span
                  class="
                    text-sm-subtitle-1 text-subtitle-2
                    font-weight-bold
                    pr-sm-10 pr-2
                  "
                  >真实姓名</span
                >
                <v-text-field
                  single-line
                  dense
                  clearable
                  v-model="status.profile.realname"
                  :class="[
                    'text-sm-body-1',
                    'text-body-2',
                    'pt-2',
                    'pl-0',
                    isMobile ? 'input-limit' : '',
                  ]"
                ></v-text-field>
              </v-list-item>
              <v-list-item class="pb-0 px-0">
                <span
                  class="
                    text-sm-subtitle-1 text-subtitle-2
                    font-weight-bold
                    pr-sm-10 pr-2
                  "
                  >入学时间</span
                >
                <v-select
                  :items="statics.yearItems"
                  dense
                  v-model="status.profile.year"
                  :class="[
                    'text-sm-body-1',
                    'text-body-2',
                    'pt-2',
                    'pl-0',
                    isMobile ? 'input-limit' : '',
                  ]"
                ></v-select>
              </v-list-item>
              <v-list-item class="pb-0 px-0">
                <span
                  class="
                    text-sm-subtitle-1 text-subtitle-2
                    font-weight-bold
                    pr-sm-10 pr-2
                  "
                  >所属年级</span
                >
                <v-select
                  :items="statics.gradeItems"
                  dense
                  v-model="status.profile.grade"
                  :class="[
                    'text-sm-body-1',
                    'text-body-2',
                    'pt-2',
                    'pl-0',
                    isMobile ? 'input-limit' : '',
                  ]"
                ></v-select>
              </v-list-item>
              <v-list-item class="px-0 pt-2">
                <v-container>
                  <v-row>
                    <v-col
                      class="
                        pa-0
                        text-sm-subtitle-1 text-subtitle-2
                        font-weight-bold
                        pr-sm-10 pr-2
                        pt-1
                      "
                      sm="2"
                      cols="3"
                      >可见性</v-col
                    >
                    <v-col class="pa-0" sm="10" :style="{transform: isMobile ? 'translate(-6px, -4px)' : 'translate(10px, -2px)'}">
                      <v-container>
                        <v-row>
                          <v-col class="pa-0" sm="3" cols="6">
                            <v-checkbox label="电子邮箱" dense v-model="status.profile['show_email']"></v-checkbox>
                          </v-col>
                          <v-col class="pa-0" sm="3" cols="6">
                            <v-checkbox label="真实姓名" dense v-model="status.profile['show_realname']"></v-checkbox>
                          </v-col>
                          <v-col class="pa-0 mt-sm-0 mt-n4" sm="3" cols="6">
                            <v-checkbox label="入学时间" dense v-model="status.profile['show_year']"></v-checkbox>
                          </v-col>
                          <v-col class="pa-0 mt-sm-0 mt-n4" sm="3" cols="6">
                            <v-checkbox label="所属年级" dense v-model="status.profile['show_grade']"></v-checkbox>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-list-item>
            </v-list>
          </v-col>
        </v-row>
        <v-overlay absolute :value="status.loading">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-overlay>
      </v-container>
    </v-card-text>
    <v-card-actions class="px-sm-4 px-2 pt-0 mt-sm-0 mt-n4">
      <v-container>
        <v-row>
          <v-col class="d-flex justify-space-between pa-0" cols="12">
            <div>
              <v-btn text @click="$emit('editPassword')" class="ml-sm-0 ml-n4">
                修改密码
              </v-btn>
            </div>
            <div class="d-flex justify-start pl-sm-5 pl-0">
              <div class="pr-sm-4">
                <v-btn text @click="doEditProfile()"> 保存 </v-btn>
              </div>
              <div>
                <v-btn text @click="status.editProfile = false"> 取消 </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>
<script>
import useEditProfileCard from "@/composables/users/profile/useEditProfileCard";

export default {
  setup() {
    const { statics, status, doReset, doEditProfile } = useEditProfileCard();
    return { statics, status, doReset, doEditProfile };
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.input-limit {
  max-width: calc(100vw - 130px);
}
</style>