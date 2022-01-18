<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="7" class="pt-0">
        <v-card>
          <v-img alt="Background Image" :src="userinfo.background" height="132"></v-img>
          <v-container>
            <v-row>
              <div class="pa-2 mt-n12 pl-8 pb-8">
                  <v-card outlined>
                    <v-avatar tile color="pink" size="160" class="rounded">
                      <h1>123</h1>
                    </v-avatar>
                  </v-card>
              </div>
              <v-col xl="7" md="8" class="pt-1">
                <v-list dense flat class="pl-2">
                  <v-list-item class="text-h4 pb-1" v-show="temp.update ^ 1">
                    {{ userinfo.nickname }}
                  </v-list-item>
                  <v-list-item v-show="temp.update">
                    <span class="font-weight-black">用户名&emsp;&emsp;</span>
                    <v-text-field single-line clearable v-model="temp.nickname"></v-text-field>
                  </v-list-item>
                  <v-list-item v-show="temp.update ^ 1">
                    <span class="font-weight-black">电子邮箱&emsp;</span>
                    {{ userinfo.email }}
                  </v-list-item>
                  <v-list-item v-show="temp.show | temp.update">
                    <span class="font-weight-black">真实姓名&emsp;</span>
                    <span v-show="temp.update ^ 1">{{ userinfo.realname }}</span>
                    <v-text-field v-show="temp.update" single-line clearable v-model="temp.realname"></v-text-field>
                  </v-list-item>
                  <v-list-item v-show="temp.show | temp.update">
                    <span class="font-weight-black">入学时间&emsp;</span>
                    <span v-show="temp.update ^ 1">{{ userinfo.year }}</span>
                    <v-select v-show="temp.update" :items="temp.yearItems" v-model="temp.year"></v-select>
                  </v-list-item>
                  <v-list-item v-show="temp.show | temp.update">
                    <span class="font-weight-black">所属年级&emsp;</span>
                    <span v-show="temp.update ^ 1">{{ userinfo.grade }}</span>
                    <v-select v-show="temp.update" :items="temp.gradeItems" v-model="temp.grade"></v-select>
                  </v-list-item>
                  <v-list-item link v-show="(temp.show ^ 1) & (temp.update ^ 1)" @click="temp.show ^= 1">
                    <v-icon>{{ icons.mdiChevronDown }}</v-icon>
                    <v-list-item-title>查看详细资料</v-list-item-title>
                  </v-list-item>
                  <v-list-item link v-show="temp.show & (temp.update ^ 1)" @click="temp.show ^= 1">
                    <v-icon>{{ icons.mdiChevronUp }}</v-icon>
                    <v-list-item-title>收起详细资料</v-list-item-title>
                  </v-list-item>
                  <v-list-item v-show="temp.update">
                    <v-container>
                      <v-row>
                        <v-col class="d-flex justify-end pr-0">
                          <v-btn color="primary" @click="temp.submit()">
                            保存
                          </v-btn>
                        </v-col>
                        <v-col class="d-flex justify-end pr-0" md="2">
                          <v-btn @click="temp.cancel()">
                            取消
                          </v-btn>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col class="d-flex flex-column justify-end pb-8 pr-8">
                <div class="d-flex justify-end">
                  <v-btn color="primary" max-width="100" @click="temp.update ^= 1" v-show="temp.update ^ 1">
                    <v-icon size="20">
                      {{ icons.mdiAccountEdit }}
                    </v-icon>
                    个人设置
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog max-width="600" v-model="temp.dialog">
      <v-card>
        <v-card-title>
          安全设置
        </v-card-title>
        
      </v-card>
    </v-dialog>
  </v-container>
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