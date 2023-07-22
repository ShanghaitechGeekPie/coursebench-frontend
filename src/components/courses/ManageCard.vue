<template>
  <div>
    <v-dialog
      width="750"
      v-model="windowStatus.showDialog"
      :transition="
        $vuetify.breakpoint.xsOnly
          ? 'dialog-bottom-transition'
          : 'scale-transition'
      "
      :fullscreen="$vuetify.breakpoint.xsOnly"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" block outlined text class="pa-0">
          <div>
            <v-icon
              size="18"
              style="transform: translate(0, -1px)"
              class="pr-1"
            >
              {{ statics.icons.mdiFormatPaint }}
            </v-icon>
            <span>管理评论</span>
          </div>
        </v-btn>
      </template>
      <v-card flat>
        <div class="pt-6 pt-sm-11 px-6 px-sm-11 d-flex justify-space-between">
          <div>
            <img
              class="small-icon"
              :src="$vuetify.theme.dark ? logoDark : logoLight"
              alt=""
            />
          </div>
          <div v-if="$vuetify.breakpoint.xsOnly">
            <v-btn
              icon
              style="transform: translate(0, -1px)"
              @click="windowStatus.showDialog = false"
              v-if="$vuetify.breakpoint.name === 'xs'"
            >
              <v-icon>{{ statics.icons.mdiWindowClose }}</v-icon>
            </v-btn>
          </div>
        </div>
        <v-window v-model="windowStatus.windowStep" touchless>
          <v-window-item :value="0">
            <v-card-title class="pt-1 px-6 px-sm-11">
              <div>
                <div class="font-weight-bold text-h5">管理评论</div>
              </div>
            </v-card-title>
            <v-card-text class="px-6 px-sm-11 pb-6 pb-sm-11">
              <div>
                <div v-for="(comment, index) in userComments" :key="index">
                  <v-hover>
                    <template v-slot:default="{ hover }">
                      <div
                        class="router-container"
                        @click="
                          setEditTarget(comment), (windowStatus.windowStep = 1)
                        "
                      >
                        <v-divider></v-divider>
                        <div class="pt-4">
                          <div
                            v-if="
                              global.userProfile.is_admin ||
                              global.userProfile.is_community_admin
                            "
                            class="d-flex"
                          >
                            <div
                              style="transform: translate(0, -1px)"
                              class="pr-1"
                            >
                              <AvatarContainer
                                :name="
                                  comment.user ? useUserName(comment.user) : '?'
                                "
                                :src="comment.user ? comment.user.avatar : ''"
                                small
                                slice
                                size="15"
                              />
                            </div>
                            <div class="pr-1">
                              {{
                                useUserName(comment.user) +
                                (comment.user && comment.is_anonymous
                                  ? '(匿名)'
                                  : '')
                              }}
                            </div>
                            <div
                              v-if="comment.is_fold"
                              style="transform: translate(0, -1px)"
                            >
                              <v-chip
                                label
                                x-small
                                class="px-1 mr-1"
                                color="secondary"
                              >
                                {{ '已隐藏' }}
                              </v-chip>
                            </div>
                            <div
                              v-if="comment.is_covered"
                              style="transform: translate(0, -1px)"
                            >
                              <v-chip
                                label
                                x-small
                                class="px-1"
                                color="warning"
                              >
                                {{ '已遮盖' }}
                              </v-chip>
                            </div>
                          </div>
                        </div>
                        <div>
                          <span class="pr-2">{{  comment.course.name  }}</span>
                          <v-icon
                            size="16"
                            style="transform: translate(0, -1px)"
                          >
                            {{ statics.icons.mdiSchoolOutline }}
                          </v-icon>
                          <span
                            v-for="(teacher, indexTeacher) in comment.group
                              .teachers"
                            :key="indexTeacher"
                            class=""
                          >
                            {{ teacher.name }}
                          </span>
                        </div>
                        <div
                          class="text-h6"
                          :style="{
                            'text-decoration': hover ? 'underline' : 'none',
                          }"
                        >
                          {{ comment.title }}
                        </div>
                        <div class="pt-4">
                          修读于：{{
                            `${comment.semester.toString().substring(0, 4)}年${
                              termItems[
                                new Number(
                                  comment.semester.toString().substring(4),
                                ) - 1
                              ].name
                            }`
                          }}
                        </div>
                        <div class="d-flex pb-4">
                          <div class="pr-2">
                            发布于：{{ unixToReadable(comment.post_time) }}
                          </div>
                          <div>
                            修改于：{{ unixToReadable(comment.update_time) }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </v-hover>
                </div>
                <v-divider></v-divider>
              </div>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="1">
            <v-card-title class="pt-0 px-6 px-sm-11">
              <div class="text-body-2 pb-1 overflow-ellipsis">
                <v-btn
                  icon
                  x-small
                  style="transform: translate(0, -1px)"
                  @click="clearEditTarget(), (windowStatus.windowStep = 0)"
                >
                  <v-icon>
                    {{ statics.icons.mdiArrowLeft }}
                  </v-icon>
                </v-btn>
                <span>{{ courseName }}</span>
              </div>
              <div style="width: 100%" class="pt-1">
                <div class="d-inline-block pr-4 align-center">
                  <AvatarContainer
                    :name="
                      formStatus.userProfile
                        ? useUserName(formStatus.userProfile)
                        : '?'
                    "
                    :src="
                      formStatus.userProfile
                        ? formStatus.userProfile.avatar
                        : ''
                    "
                    slice
                    :size="50"
                  />
                </div>
                <div
                  class="d-inline-block align-center"
                  style="width: calc(100% - 72px)"
                >
                  <v-text-field
                    label="标题"
                    class="font-weight-bold"
                    v-model="formStatus.title"
                    :error-messages="
                      errorMsg.target === 'title' ? errorMsg.msg : ''
                    "
                    disabled
                  ></v-text-field>
                </div>
              </div>
            </v-card-title>
            <v-card-text class="px-6 px-sm-11 pb-6 pb-sm-11">
              <div>
                <v-sheet
                  flat
                  outlined
                  min-height="202px"
                  style="margin-bottom: 30px"
                >
                  <TextContainer
                    :text="formStatus.content"
                    markdown
                    title="1321"
                    no-expand
                  >
                  </TextContainer>
                </v-sheet>
              </div>
              <div class="d-flex justify-space-between flex-wrap">
                <div
                  v-for="(dim, index) in judgeItems"
                  :key="index"
                  class="align-center py-3"
                  :style="{
                    width: $vuetify.breakpoint.xsOnly ? '100%' : '48%',
                  }"
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
                    disabled
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
                      {{ gradingEmojis[value - 1] }}
                    </template>
                  </v-slider>
                </div>
              </div>
              <div
                class="d-flex justify-end justify-sm-space-between flex-wrap"
              >
                <div
                  :class="[
                    'd-flex',
                    'flex-wrap',
                    'justify-sm-start',
                    formStatus.id == null
                      ? 'justify-space-between'
                      : 'justify-end',
                  ]"
                >
                  <div
                    :class="[
                      'pr-sm-4',
                      formStatus.id == null ? 'pr-0' : 'pr-4',
                    ]"
                  >
                    <v-select
                      style="width: 100px"
                      v-model="courseYear"
                      :items="yearItems"
                      label="修读时间"
                      :error="errorMsg.target === 'semester'"
                      disabled
                    ></v-select>
                  </div>
                  <div class="pr-sm-4 pr-0">
                    <v-select
                      style="width: 100px"
                      v-model="courseTerm"
                      :items="termItems"
                      item-text="name"
                      item-value="id"
                      label="修读学期"
                      :error="errorMsg.target === 'semester'"
                      disabled
                    ></v-select>
                  </div>
                  <div
                    class="d-flex align-center"
                    :style="{
                      width: $vuetify.breakpoint.xsOnly ? '100%' : '',
                    }"
                  >
                    <div
                      class="d-flex justify-sm-start justify-end"
                      :style="{
                        width: $vuetify.breakpoint.xsOnly ? '100%' : '',
                      }"
                    >
                      <div class="align-center d-flex pr-4">
                        <v-switch
                          v-model="formStatus.is_anonymous"
                          class="mt-0"
                          label="匿名"
                          color="info"
                          hide-details
                          disabled
                        ></v-switch>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="align-center d-flex pt-sm-0 pt-8 justify-sm-start justify-end"
                  :style="{
                    width: $vuetify.breakpoint.xsOnly ? '100%' : '',
                  }"
                >
                  <div class="d-flex justify-end">
                    <div>
                      <v-btn
                        color="error"
                        depressed
                        @click="doDeleteComment"
                        :loading="formStatus.deleteLoading"
                        class="mr-4"
                      >
                        {{ '删除评论' }}
                      </v-btn>
                      <span>
                        <v-btn
                          :color="formStatus.is_covered ? 'success' : 'warning'"
                          depressed
                          @click="doCoverComment"
                          :loading="formStatus.coverLoading"
                          class="mr-4"
                          v-if="!formStatus.is_fold"
                        >
                          {{ formStatus.is_covered ? '取消遮盖' : '遮盖评论' }}
                        </v-btn>
                        <v-btn
                          :color="formStatus.is_fold ? 'accent' : 'secondary'"
                          depressed
                          @click="doHideComment"
                          :loading="formStatus.hideLoading"
                          v-if="!formStatus.is_covered"
                        >
                          {{ formStatus.is_fold ? '取消隐藏' : '隐藏评论' }}
                        </v-btn>
                        <v-btn
                          color="lime accent-4"
                          depressed
                          @click="doRegenerateCover"
                          :loading="formStatus.regenerateLoading"
                          v-if="formStatus.is_covered"
                        >
                          {{ '重新生成' }}
                        </v-btn>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {
  judgeItems,
  rawYearItems as yearItems,
  termItems,
} from '@/composables/global/useStaticData';
import { inject } from 'vue';
import useManageCard from '@/composables/courses/comment/useManageCard';
import { gradingEmojis } from '@/composables/global/useStaticData';
import AvatarContainer from '@/components/users/profile/AvatarContainer';
import TextContainer from '@/components/users/comment/TextContainer';
import { gradingInfo } from '@/composables/global/useStaticData';
import { unixToReadable } from '@/composables/global/useTimeUtils';
import logoDark from '@/assets/logo-white.svg';
import logoLight from '@/assets/logo.svg';
import { commentPolicy } from 'Policy';
import useUserName from '@/composables/global/useUserName';

export default {
  setup() {
    const {
      statics,
      errorMsg,
      formStatus,
      windowStatus,
      courseYear,
      courseTerm,
      userComments,
      courseName,
      doHideComment,
      doDeleteComment,
      doCoverComment,
      doRegenerateCover,
      setEditTarget,
      clearEditTarget,
    } = useManageCard();

    const global = inject('global');

    return {
      useUserName,
      commentPolicy,
      logoDark,
      logoLight,
      unixToReadable,
      judgeItems,
      yearItems,
      termItems,
      gradingInfo,
      global,
      statics,
      errorMsg,
      formStatus,
      windowStatus,
      courseYear,
      courseTerm,
      userComments,
      courseName,
      doHideComment,
      doDeleteComment,
      doCoverComment,
      doRegenerateCover,
      setEditTarget,
      clearEditTarget,
      gradingEmojis,
    };
  },
  components: {
    AvatarContainer,
    TextContainer,
  },
};
</script>
<style scoped>
.router-container:hover {
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
</style>
