<template>
  <v-col v-if="status.editInfo" sm="8" class="pa-sm-3 pa-0">
    <v-container>
      <v-row>
        <v-col class="pa-0">
          <v-list dense flat class="pl-sm-2 pl-0 py-sm-2 py-0">
            <v-list-item class="pb-sm-2 pb-0 px-sm-4 px-0">
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
                v-model="status.info.nickname"
                :class="[
                  'text-sm-body-1',
                  'text-body-2',
                  'pt-0',
                  'pl-0',
                  isMobile ? 'input-limit' : '',
                ]"
              ></v-text-field>
            </v-list-item>
            <v-list-item class="pb-sm-2 pb-0 px-sm-4 px-0">
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
                v-model="status.info.realname"
                :class="[
                  'text-sm-body-1',
                  'text-body-2',
                  'pt-0',
                  'pl-0',
                  isMobile ? 'input-limit' : '',
                ]"
              ></v-text-field>
            </v-list-item>
            <v-list-item class="pb-sm-2 pb-0 px-sm-4 px-0">
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
                v-model="status.info.year"
                :class="[
                  'text-sm-body-1',
                  'text-body-2',
                  'pt-0',
                  'pl-0',
                  isMobile ? 'input-limit' : '',
                ]"
              ></v-select>
            </v-list-item>
            <v-list-item class="px-sm-4 px-0">
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
                v-model="status.info.grade"
                :class="[
                  'text-sm-body-1',
                  'text-body-2',
                  'pt-0',
                  'pl-0',
                  isMobile ? 'input-limit' : '',
                ]"
              ></v-select>
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
    <v-container>
      <v-row>
        <v-col class="d-flex justify-space-between pl-sm-5 pl-0 pr-4 pt-sm-3 pt-1" cols="12">
          <div>
            <v-btn
                color="red darken-1 white--text"
                @click="status.editKwd = true"
                v-if="!isMobile"
              >
                修改密码
            </v-btn>
            <v-btn
                color="red darken-1 white--text"
                @click="status.editKwd = true"
                v-if="isMobile"
                small
              >
                修改密码
            </v-btn>
          </div>
          <div class="d-flex justify-start pl-sm-5 pl-0">
            <div class="pr-sm-4 pr-3">
              <v-btn
                color="primary"
                @click="doEditInfo()"
                v-if="!isMobile"
              >
                保存
              </v-btn>
              <v-btn
                color="primary"
                @click="doEditInfo()"
                v-if="isMobile"
                small
              >
                保存
              </v-btn>
            </div>
            <div>
              <v-btn 
                @click="doReset()"
                v-if="!isMobile"
              >
                取消 
              </v-btn>
              <v-btn 
                @click="doReset()"
                v-if="isMobile"
                small
              >
                取消 
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-edit-kwd></v-edit-kwd>
  </v-col>
</template>
<script>
import useEditInfo from "@/composables/users/profile/useEditInfo";
import EditKwd from "@/components/users/profile/EditKwd";

export default {
  setup() {
    const { statics, status, doReset, doEditInfo } = useEditInfo();
    // onMounted(doReset())
    return { statics, status, doReset, doEditInfo };
  },
  components: {
    "v-edit-kwd": EditKwd,
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
  max-width: calc(100vw - 175px);
}
</style>