<template>
  <v-card tile elevation="0">
    <slot name="title" :localComment="comment">
      <v-card-title class="pa-sm-4 pa-2 pb-sm-0 py-sm-0">
        <v-container>
          <v-row>
            <v-col cols="12" class="pa-0 d-flex">
              <div class="pr-2" style="transform: translate(0, -1px)">
                <v-icon size="24">
                  {{ statics.icons.mdiSubtitlesOutline }}
                </v-icon>
              </div>
              <div class="justify-start text-h6 overflow">
                {{ comment.is_covered ? comment.cover_title : comment.title }}
              </div>
            </v-col>
          </v-row>
        </v-container>
        <div v-if="comment.is_covered" class="pt-1" style="width: 100%">
          <CommentCover :reason="comment.cover_reason" />
        </div>
      </v-card-title>
    </slot>
    <v-card-text class="pa-0">
      <v-container>
        <v-row>
          <v-col class="pa-0 pt-sm-2">
            <!-- <div class="px-4 pb-1" v-if="comment.user_score_ranking > 0">
              <span class="font-weight-bold pr-2">课程绩点</span>
              <span class="text-caption">{{ comment.user_score_ranking.toFixed(1) }}</span>
            </div> -->
            <slot name="content" :localComment="comment">
              <TextContainer
                :text="
                  comment.is_covered ? comment.cover_content : comment.content
                "
                :title="
                  comment.is_covered ? comment.cover_title : comment.title
                "
                markdown
                dense
                :dialog="$vuetify.breakpoint.name === 'xs'"
                #default="{ overflow }"
              >
                <slot name="contentNote" :localComment="comment">
                  <div
                    class="pa-0 pb-2 pt-sm-3 pt-2 d-flex align-center"
                    :style="{ 'max-width': overflow ? '60vw' : '90%' }"
                  >
                    <v-icon size="16">
                      {{ statics.icons.mdiSchoolOutline }}
                    </v-icon>
                    <span
                      v-for="(teacher, index) in comment.group.teachers"
                      :class="
                        'pl-1 text-caption font-weight-bold' + teacher.name ===
                        '其他'
                          ? ''
                          : ' router-container'
                      "
                      :key="index"
                      @click="
                        teacher.name === '其他'
                          ? ''
                          : $router.push({ path: `/teacher/${teacher.id}` })
                      "
                    >
                      {{ teacher.name }}
                    </span>
                    <v-icon size="16">
                      {{ statics.icons.mdiClockOutline }}
                    </v-icon>
                    <span class="text-caption">
                      {{ semester }}
                    </span>
                    
                    </div>
                  </div>
                </slot>
              </TextContainer>
            </slot>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 pl-sm-1 pb-sm-4 pb-2 pt-2" cols="12">
            <v-container>
              <v-row class="d-flex justify-space-between">
                <v-col
                  class="pa-0"
                  :cols="$vuetify.breakpoint.width > 420 ? 7 : 8"
                  sm="8"
                >
                  <v-container>
                    <v-row class="pl-3">
                      <v-col
                        v-for="index in judgeItems.length"
                        :key="index"
                        cols="6"
                        sm="3"
                        :class="['px-0', 'py-0']"
                      >
                        <div>
                          <span
                            :class="[
                              'pr-1 font-weight-bold text-body-2',
                              index === 1 ? 'pr-md-0 pr-lg-1' : '',
                            ]"
                            >{{ judgeItems[index - 1] }}</span
                          >
                          <v-chip
                            x-small
                            label
                            :color="
                              gradingInfo.color[comment.score[index - 1] - 1]
                            "
                            class="px-1"
                          >
                            <span class="text-caption white--text">{{
                              statics.grade[index - 1][
                                comment.score[index - 1] - 1
                              ]
                            }}</span>
                          </v-chip>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col class="pa-0 pr-sm-4 pr-3" cols="4">
                  <slot
                    name="footerNote"
                    :comment="comment"
                    :statics="statics"
                    :semester="semester"
                  >
                    <div class="d-flex justify-end" style="flex-wrap: wrap">
                      <div class="pr-sm-2">
                        <v-icon size="15" style="transform: translate(0, -1px)">
                          {{ statics.icons.mdiTriangle }}
                        </v-icon>
                        <span class="text-caption">
                          赞同 {{ comment.like - comment.dislike }}
                        </span>
                      </div>
                    </div>
                  </slot>
                </v-col>
              </v-row>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import useCommentCardContent from '@/composables/users/comment/useCommentCardContent';
import TextContainer from '@/components/users/comment/TextContainer';
import CommentCover from '@/components/users/comment/CommentCover';
import useForms from '@/composables/users/forms/useForms';
import useModifyReward from '@/composables/reward/useModifyReward';
import { inject, ref } from 'vue';
import {
  judgeItems,
  gradingInfo,
  termItems,
} from '@/composables/global/useStaticData';

// TODO: Decide if the score by user is int or float

// Some ancient shit are contained in this component that is not worth to fix
//  if you want to fix this, the best way is to remove all the v-container stuff
//  and use vanilla div, and rewrite the reactive paddings
export default {
  setup() {
    const showSnackbar = inject('showSnackbar');
    const { statics, global } = useCommentCardContent();
    const { formRules } = useForms();
    const { formStatus, doModifyReward, onEnterUp } = useModifyReward();
    return {
      statics,
      judgeItems,
      gradingInfo,
      global,
      formRules,
      formStatus,
      onEnterUp,
      doModifyReward,
      showSnackbar,
    };
  },
  components: { TextContainer, CommentCover },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  computed: {
    semester() {
      let sem = String(this.comment.semester);
      let year = sem.substring(0, 4);
      let season = sem.substring(4);
      return `${year}年${termItems[new Number(season) - 1].name}`;
    },
  },
  data() {
    let localReward = this.comment.reward / 100;
    return {
      localReward,
    };
  },
  methods: {
    onEnterPressed() {
      if (this.formRules.reward(this.localReward) === true) {
        this.formStatus.reward = this.localReward;
        this.formStatus.id = this.comment.id;
        this.doModifyReward();
      } else this.showSnackbar('error', '赏金格式错误');
    },
  },
};
</script>

<style scoped>
.overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.router-container:hover {
  cursor: pointer;
}
</style>
