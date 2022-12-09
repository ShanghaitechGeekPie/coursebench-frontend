<template>
  <div>
    <v-dialog width="750" transition :fullscreen="$vuetify.breakpoint.xsOnly">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="global.isLogin"
          v-bind="attrs"
          v-on="on"
          block
          outlined
          text
          class="pa-0"
        >
          <v-icon size="18" style="transform: translate(0, 1px)">
            {{ statics.icons.mdiPencil }}
          </v-icon>
          {{ writingMode ? "修改评论" : "写评论" }}
        </v-btn>
        <v-btn
          v-else
          v-bind="attrs"
          v-on="on"
          block
          outlined
          text
          class="pa-0"
          :disabled="true"
        >
          您还没有登录
        </v-btn>
      </template>
      <v-card elevation="0">
        <v-card-title class="px-sm-6 px-2">
          <v-container class="pa-0">
            <v-row align="center">
              <v-col sm="1" cols="2">
                <avatar-container
                  :name="global.userProfile.nickname"
                  slice
                  :src="global.userProfile.avatar"
                  :size="50"
                />
              </v-col>
              <v-col sm="11" cols="10">
                <v-text-field
                  label="标题"
                  class="font-weight-bold"
                  v-model="formStatus.title"
                  :error-messages="
                    errorMsg.target === 'title' ? errorMsg.msg : ''
                  "
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-title>
        <v-card-text class="pb-2 px-sm-6 px-2">
          <v-textarea
            label="发一条友善的评论"
            auto-grow
            outlined
            rows="5"
            messages="支持markdown"
            v-model="formStatus.content"
            :error-messages="errorMsg.target === 'content' ? errorMsg.msg : ''"
            v-show="!viewMode"
          >
          </v-textarea>
          <v-card outlined v-show="viewMode">
            <TextContainer :text="formStatus.content" markdown title="1321">
            </TextContainer>
          </v-card>
          <v-container class="pa-0 pt-4">
            <v-row class="d-flex justify-end">
              <v-col
                v-for="(dim, index) in statics.judgeItems"
                :key="index"
                sm="6"
                cols="12"
                class="pb-sm-2 pb-0"
                align="center"
              >
                <v-slider
                  v-model="formStatus.slider[index]"
                  class="align-center"
                  max="5"
                  min="1"
                  step="1"
                  :color="gradingInfo.color[formStatus.slider[index] - 1]"
                  track-color="grey"
                  thumb-label
                  hide-details
                  :label="dim"
                >
                  <template v-slot:append>
                    <v-chip
                      x-small
                      label
                      :color="gradingInfo.color[formStatus.slider[index] - 1]"
                      class="px-1"
                    >
                      <span class="text-caption white--text">{{
                        statics.grade[index][formStatus.slider[index] - 1]
                      }}</span>
                    </v-chip>
                  </template>
                  <template v-slot:thumb-label="{ value }">
                    {{ satisfactionEmojis[value - 1] }}
                  </template>
                </v-slider>
              </v-col>
            </v-row>
          </v-container>
          <div
            class="d-flex justify-space-between pt-6"
            style="flex-wrap: wrap"
          >
            <div class="d-flex" style="flex-wrap: wrap">
              <div class="pr-2">
                <v-select
                  style="width: 100px"
                  v-model="courseYear"
                  :items="statics.yearItems"
                  label="修读时间"
                  :error="errorMsg.target === 'semester'"
                ></v-select>
              </div>
              <div class="px-2">
                <v-select
                  style="width: 100px"
                  v-model="courseTerm"
                  :items="statics.termItems"
                  item-text="name"
                  item-value="id"
                  label="修读学期"
                  :error="errorMsg.target === 'semester'"
                ></v-select>
              </div>
              <div class="px-2">
                <v-select
                  style="width: 100px"
                  v-model="formStatus.commentTarget"
                  :items="teachers"
                  item-text="name"
                  item-value="id"
                  label="评价对象"
                  :error-messages="
                    errorMsg.target === 'comentTarget' ? errorMsg.msg : ''
                  "
                  :disabled="writingMode === 'edit'"
                ></v-select>
              </div>
              <div class="px-2 d-flex align-center">
                <div>
                  <v-switch
                    v-model="formStatus.is_anonymous"
                    class="mt-0"
                    label="匿名"
                    color="info"
                    hide-details
                  ></v-switch>
                </div>
              </div>
              <div class="d-flex px-2 align-center">
                <div>
                  <v-checkbox
                    v-model="viewMode"
                    class="mt-0"
                    label="预览"
                    color="info"
                    hide-details
                  ></v-checkbox>
                </div>
              </div>
            </div>
            <div class="d-flex align-center justify-end">
              <div>
                <v-btn
                  :color="formStatus.isPostError ? 'error' : 'primary'"
                  depressed
                  @click="doSubmit"
                  :loading="formStatus.loading"
                >
                  {{ writingMode == "edit" ? "修改评论" : "发表评论" }}
                  <v-icon>
                    {{ statics.icons.mdiChevronRight }}
                  </v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import useWritingBox from "@/composables/courses/comment/useWritingBox";
// import useProfile from "@/composables/users/profile/useProfile";
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import TextContainer from "@/components/users/comment/TextContainer";
import { inject } from "vue";
import { gradingEmojis } from "@/composables/global/useStaticData";

export default {
  components: {
    AvatarContainer,
    TextContainer,
  },
  setup() {
    const {
      statics,
      teachers,
      gradingInfo,
      doSubmit,
      formStatus,
      errorMsg,
      writingMode,
      courseYear,
      courseTerm,
    } = useWritingBox();
    const global = inject("global");

    return {
      statics,
      global,
      teachers,
      gradingInfo,
      doSubmit,
      formStatus,
      errorMsg,
      writingMode,
      courseYear,
      courseTerm,
    };
  },
  data() {
    return {
      satisfactionEmojis: gradingEmojis,
      viewMode: false,
    };
  },
  methods: {
    getSemesterCode() {
      if (this.courseYear === 0) {
        return "";
      }
      if (this.courseTerm === "") {
        return "";
      }
      return this.courseYear + this.courseTerm;
    },
  },
  watch: {
    courseYear() {
      this.formStatus.semester = this.getSemesterCode();
    },
    courseTerm() {
      this.formStatus.semester = this.getSemesterCode();
    },
    global: {
      handler() {
        window.location.reload();
      },
      deep: true,
      immediate: false,
    },
  },
  mounted() {},
};
</script>

<style scoped>
.writing-area {
  max-height: 336px;
  overflow-y: scroll;
}
</style>
