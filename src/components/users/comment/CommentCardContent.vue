<template>
  <v-card tile elevation="0">
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
              {{ comment.title }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-title>
    <v-card-text class="pa-0">
      <v-container>
        <v-row>
          <v-col class="pa-0 pt-sm-2">
            <!-- <div class="px-4 pb-1" v-if="comment.user_score_ranking > 0">
              <span class="font-weight-bold pr-2">课程绩点</span>
              <span class="text-caption">{{ comment.user_score_ranking.toFixed(1) }}</span>
            </div> -->
            <TextContainer
              :text="comment.content"
              :title="comment.title"
              markdown
              dense
              :dialog="$vuetify.breakpoint.name === 'xs'"
              #default="{ overflow }"
            >
              <slot name="contentNote" :localComment="comment">
                <v-row>
                  <v-col
                    class="pa-0 pl-3 pb-2 pt-sm-3 pt-2"
                    :style="{ 'max-width': overflow ? '60vw' : '90%' }"
                    cols="12"
                  >
                    <v-icon size="16">
                      {{ statics.icons.mdiSchoolOutline }}
                    </v-icon>
                    <span
                      v-for="(teacher, index) in comment.group.teachers"
                      class="pl-1 router-container text-caption font-weight-bold"
                      :key="index"
                      @click="$router.push({ path: `/teacher/${teacher.id}` })"
                    >
                      {{ teacher.name }}
                    </span>
                  </v-col>
                </v-row>
              </slot>
            </TextContainer>
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
                    <v-row>
                      <v-col
                        v-for="index in judgeItems.length"
                        :key="index"
                        cols="6"
                        sm="3"
                        :class="[
                          'py-0',
                          !(index % 2)
                            ? 'px-lg-3 px-md-0 px-sm-1 px-0'
                            : 'pl-2 pr-lg-3 pr-md-0 pr-sm-1 pr-0',
                          index === 1 ? 'pl-sm-3' : '',
                          index === 3 ? 'pl-lg-3 pl-md-0 pl-sm-1' : '',
                        ]"
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
                            :color="gradingInfo.color[comment.score[index - 1] - 1]"
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
                <v-col 
                  class="pa-0 pr-sm-4 pr-3" 
                  cols="4"
                >                  
                  <slot name="footerNote" :localComment="comment">
                    <div class="d-flex justify-end" style="flex-wrap: wrap">
                      <div class="pr-sm-2">
                        <v-icon size="15" style="transform: translate(0, -1px)">
                          {{ statics.icons.mdiTriangleOutline }}
                        </v-icon>
                        <span class="text-caption">
                          获赞 {{ comment.like - comment.dislike }}
                        </span>
                      </div>
                      <div>
                        <v-icon size="16">
                          {{ statics.icons.mdiClockOutline }}
                        </v-icon>
                        <span class="text-caption">
                          {{ semester }}
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
import useCommentCardContent from "@/composables/users/comment/useCommentCardContent";
import TextContainer from "@/components/users/comment/TextContainer";
import { judgeItems, gradingInfo } from "@/composables/global/useStaticData";

// TODO: Decide if the score by user is int or float

// Some ancient shit are contained in this component that is not worth to fix
//  if you want to fix this, the best way is to remove all the v-container stuff
//  and use vanilla div, and rewrite the reactive paddings
export default {
  setup() {
    const { statics } = useCommentCardContent();
    return { statics, judgeItems, gradingInfo };
  },
  components: { TextContainer },
  props: { 
    comment: {
      type: Object,
      required: true,
    }
  },
  computed: {
    semester() {
      let sem = new String(this.comment.semester);
      let year = sem.substring(0, 4);
      let season = sem.substring(4);
      return `${year}年${season == "02" ? "秋" : "春"}`;
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
