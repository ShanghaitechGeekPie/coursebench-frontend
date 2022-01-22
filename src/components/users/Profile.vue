<template>
  <v-row justify="center">
    <v-col xl="7">
      <v-card>
        <v-img alt="Background Image" :src="userinfo.background" height="240"></v-img>
        <v-container>
          <v-row>
            <div class="pa-2 mt-n12 pl-8 pb-8">
              <v-card outlined>
                <v-avatar tile color="pink" size="160" class="rounded">
                  <h1>123</h1>
                </v-avatar>
              </v-card>
            </div>
            <v-col class="pt-1 d-flex justify-space-between" v-if="temp.update ^ 1">
              <div>
                <div class="text-h4 pt-2 pl-6">{{ userinfo.nickname }}</div>
                <div class="d-flex pt-1">
                  <v-list dense flat class="pl-2 py-0">
                    <v-list-item>
                      <span class="font-weight-black">电子邮箱</span>
                    </v-list-item>
                    <v-list-item v-if="temp.show">
                      <span class="font-weight-black">真实姓名</span>
                    </v-list-item>
                    <v-list-item v-if="temp.show">
                      <span class="font-weight-black">入学时间</span>
                    </v-list-item>
                    <v-list-item v-if="temp.show">
                      <span class="font-weight-black">所属年级</span>
                    </v-list-item>
                  </v-list>
                  <v-list dense flat class="pl-2 py-0">
                    <v-list-item>{{ userinfo.email }}</v-list-item>
                    <v-list-item v-if="temp.show">{{ userinfo.realname }}</v-list-item>
                    <v-list-item v-if="temp.show">{{ userinfo.year }}</v-list-item>
                    <v-list-item v-if="temp.show">{{ userinfo.grade }}</v-list-item>
                  </v-list>
                </div>
                <div class="mt-n2">
                  <v-list-item link v-if="temp.show ^ 1" @click="temp.show ^= 1">
                    <v-icon>{{ icons.mdiChevronDown }}</v-icon>
                    <v-list-item-title>查看详细资料</v-list-item-title>
                  </v-list-item>
                  <v-list-item link v-if="temp.show" @click="temp.show ^= 1">
                    <v-icon>{{ icons.mdiChevronUp }}</v-icon>
                    <v-list-item-title>收起详细资料</v-list-item-title>
                  </v-list-item>
                </div>
              </div>
              <div class="d-flex justify-end flex-column pr-4 pb-4">
                <v-btn color="primary" max-width="100" @click="temp.update ^= 1">
                  <v-icon size="20">{{ icons.mdiAccountEdit }}</v-icon>个人设置
                </v-btn>
              </div>
            </v-col>
            <v-col class="pt-1 pr-4" v-if="temp.update" sm="8" md="7">
              <v-container>
                <v-row>
                  <v-col md="3" class="pa-0">
                    <v-list dense flat class="pl-2">
                      <v-list-item class="pb-2">
                        <span class="font-weight-black">用户名</span>
                      </v-list-item>
                      <v-list-item class="pb-2">
                        <span class="font-weight-black">真实姓名</span>
                      </v-list-item>
                      <v-list-item class="pb-2">
                        <span class="font-weight-black">入学时间</span>
                      </v-list-item>
                      <v-list-item>
                        <span class="font-weight-black">所属年级</span>
                      </v-list-item>
                    </v-list>
                  </v-col>
                  <v-col class="pa-0">
                    <v-list dense flat class="pl-0">
                      <v-list-item class="pa-0 ml-n2">
                        <v-text-field
                          single-line
                          dense
                          clearable
                          v-model="temp.nickname"
                          class="pt-0 pl-0"
                        ></v-text-field>
                      </v-list-item>
                      <v-list-item class="pa-0 ml-n2">
                        <v-text-field
                          single-line
                          dense
                          clearable
                          v-model="temp.realname"
                          class="pt-0 pl-0"
                        ></v-text-field>
                      </v-list-item>
                      <v-list-item class="pa-0 ml-n2">
                        <v-select
                          :items="temp.yearItems"
                          dense
                          v-model="temp.year"
                          class="pt-0 pl-0"
                        ></v-select>
                      </v-list-item>
                      <v-list-item class="pa-0 ml-n2">
                        <v-select
                          :items="temp.gradeItems"
                          dense
                          v-model="temp.grade"
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
                      <v-btn color="red darken-1 white--text" @click="temp.dialog ^= 1">修改密码</v-btn>
                    </v-col>
                    <v-col class="d-flex justify-end pr-0" md="2">
                      <div class="pr-4">
                        <v-btn color="primary" @click="temp.submit()">保存</v-btn>
                      </div>
                      <div>
                        <v-btn @click="temp.cancel()">取消</v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
    <v-dialog max-width="600" v-model="temp.dialog">
      <v-card>
        <v-card-title>安全设置</v-card-title>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import userProfile from "@/composables/users/useProfile";

import {
  mdiChevronDown,
  mdiChevronUp,
  mdiAccountEdit
} from '@mdi/js'

export default {
  setup() {
    const { userinfo, temp } = userProfile();
    return { userinfo, temp };
  },
  data() {
    return {
      icons: {
        mdiChevronDown,
        mdiChevronUp,
        mdiAccountEdit
      }
    }
  }
};
</script>