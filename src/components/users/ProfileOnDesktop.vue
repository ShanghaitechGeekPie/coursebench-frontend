<template>
  <v-card>
    <v-img
      alt="Background Image"
      :src="userinfo.background"
      height="240"
    ></v-img>
    <v-container>
      <v-row>
        <div class="pa-2 mt-n12 pl-md-8 pl-sm-5 pb-md-8 pb-sm-4">
          <v-card outlined>
            <v-avatar tile color="pink" size="160" class="rounded">
              <span class="text-h3">123</span>
            </v-avatar>
          </v-card>
        </div>
        <v-col class="pt-1 d-flex justify-space-between" v-if="status.update ^ 1">
          <v-row>
            <v-col class="px-3" order-sm="1" order="2">
              <div class="text-sm-h4 text-h5 pt-2 pl-6">
                {{ userinfo.nickname }}
              </div>
              <div class="d-flex pt-1">
                <v-list dense flat class="pl-2 py-0">
                  <v-list-item class="d-flex justify-space-between">
                    <span
                      class="
                        text-sm-subtitle-1 text-subtitle-2
                        font-weight-black
                        pr-10
                      "
                      >电子邮箱</span
                    >
                    <span class="text-sm-subtitle-1 text-subtitle-2">{{
                      userinfo.email
                    }}</span>
                  </v-list-item>
                  <v-list-item v-if="status.show">
                    <span
                      class="
                        text-sm-subtitle-1 text-subtitle-2
                        font-weight-black
                        pr-10
                      "
                      >真实姓名</span
                    >
                    <span class="text-sm-subtitle-1 text-subtitle-2">{{
                      userinfo.realname
                    }}</span>
                  </v-list-item>
                  <v-list-item v-if="status.show">
                    <span
                      class="
                        text-sm-subtitle-1 text-subtitle-2
                        font-weight-black
                        pr-10
                      "
                      >入学时间</span
                    >
                    <span class="text-sm-subtitle-1 text-subtitle-2">{{
                      userinfo.year
                    }}</span>
                  </v-list-item>
                  <v-list-item v-if="status.show">
                    <span
                      class="
                        text-sm-subtitle-1 text-subtitle-2
                        font-weight-black
                        pr-10
                      "
                      >所属年级</span
                    >
                    <span class="text-sm-subtitle-1 text-subtitle-2">{{
                      userinfo.grade
                    }}</span>
                  </v-list-item>
                </v-list>
              </div>
              <div class="mt-n2">
                <v-list-item link v-if="status.show ^ 1" @click="status.show ^= 1">
                  <v-icon>{{ icons.mdiChevronDown }}</v-icon>
                  <v-list-item-title class="text-sm-subtitle-1 text-subtitle-2"
                    >查看详细资料</v-list-item-title
                  >
                </v-list-item>
                <v-list-item link v-if="status.show" @click="status.show ^= 1">
                  <v-icon>{{ icons.mdiChevronUp }}</v-icon>
                  <v-list-item-title class="text-sm-subtitle-1 text-subtitle-2"
                    >收起详细资料</v-list-item-title
                  >
                </v-list-item>
              </div>
            </v-col>
            <v-col
              sm="3"
              lg="2"
              class="px-0 d-flex justify-end flex-column"
              order-sm="2"
              order="1"
            >
              <div class="d-flex justify-end pr-md-8 pr-sm-5">
                <div
                  class="d-flex justify-end flex-column pb-3 pl-lg-0 pl-md-5"
                >
                  <v-btn color="primary" width="100" @click="status.update ^= 1">
                    <v-icon size="20">
                      {{ icons.mdiAccountEdit }}
                    </v-icon>
                    <span class="text-subtitle-1">个人设置</span>
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pt-1 pr-4" v-if="status.update" sm="8" md="8">
          <v-container>
            <v-row>
              <v-col class="pa-0">
                <v-list dense flat class="pl-2">
                  <v-list-item class="pb-2 px-4">
                    <span class="font-weight-black pr-14">用户名</span>
                    <v-text-field
                      single-line
                      dense
                      clearable
                      v-model="status.nickname"
                      class="pt-0 pl-0"
                    ></v-text-field>
                  </v-list-item>
                  <v-list-item class="pb-2 px-4">
                    <span class="font-weight-black pr-10">真实姓名</span>
                    <v-text-field
                      single-line
                      dense
                      clearable
                      v-model="status.realname"
                      class="pt-0 pl-0"
                    ></v-text-field>
                  </v-list-item>
                  <v-list-item class="pb-2 px-4">
                    <span class="font-weight-black pr-10">入学时间</span>
                    <v-select
                      :items="status.yearItems"
                      dense
                      v-model="status.year"
                      class="pt-0 pl-0"
                    ></v-select>
                  </v-list-item>
                  <v-list-item class="px-4">
                    <span class="font-weight-black pr-10">所属年级</span>
                    <v-select
                      :items="status.gradeItems"
                      dense
                      v-model="status.grade"
                      class="pt-0 pl-0"
                    ></v-select>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>
          <div>
            <v-container>
              <v-row>
                <v-col class="d-flex justify-start pl-5">
                  <v-btn
                    color="red darken-1 white--text"
                    @click="status.dialog ^= 1"
                  >
                    修改密码
                  </v-btn>
                </v-col>
                <v-col class="d-flex justify-end pr-4 pl-3" md="2">
                  <div class="pr-4">
                    <v-btn color="primary" @click="status.submit()"> 保存 </v-btn>
                  </div>
                  <div>
                    <v-btn @click="status.cancel()"> 取消 </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import { mdiChevronDown, mdiChevronUp, mdiAccountEdit } from "@mdi/js";

export default {
  data() {
    return {
      userinfo: this.$parent.userinfo, 
      status: this.$parent.status, 
      icons: {
        mdiChevronDown,
        mdiChevronUp,
        mdiAccountEdit,
      },
    };
  }
};
</script>