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
              :text="comment.comment"
              :title="comment.title"
              markdown
              dense
              :dialog="breakpoint.name === 'xs'"
              #default="{ overflow }"
            >
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
                    class="pl-1 router-container text-caption"
                    :key="index"
                    @click="$router.push({ path: `teacher/${teacher.id}` })"
                  >
                    {{ teacher.name }}
                  </span>
                </v-col>
              </v-row>
            </TextContainer>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="pa-0 pl-sm-1 pb-2 pt-2" cols="12">
            <v-container>
              <v-row class="d-flex justify-space-between">
                <v-col class="pa-0" :cols="breakpoint.width > 420 ? 7 : 8" sm="8">
                  <v-container>
                    <v-row>
                      <v-col cols="6" sm="3" class="py-0 pl-sm-3 pl-2 pr-lg-3 pr-md-0 pr-sm-1 pr-0">
                        <div>
                          <span class="pr-1 pr-md-0 pr-lg-1 font-weight-bold text-body-2">课程质量</span>
                          <v-chip x-small label :color="statics.color[comment.score[0] - 1]" class="px-1">
                            <span class="text-caption white--text">{{ statics.grade[0][comment.score[0] - 1] }}</span>
                          </v-chip>
                        </div>
                      </v-col>
                      <v-col cols="6" sm="3" class="py-0 px-lg-3 px-md-0 px-sm-1 px-0">
                        <div>
                          <span class="pr-1 font-weight-bold text-body-2">作业用时</span>
                          <v-chip x-small label :color="statics.color[comment.score[1] - 1]" class="px-1">
                            <span class="text-caption white--text">{{ statics.grade[1][comment.score[1] - 1] }}</span>
                          </v-chip>
                        </div>
                      </v-col>
                      <v-col cols="6" sm="3" class="py-0 pl-lg-3 pl-md-0 pl-sm-1 pl-2 pr-lg-3 pr-md-0 pr-sm-1 pr-0">
                        <div>
                          <span class="pr-1 font-weight-bold text-body-2">考核难度</span>
                          <v-chip x-small label :color="statics.color[comment.score[2] - 1]" class="px-1">
                            <span class="text-caption white--text">{{ statics.grade[2][comment.score[2] - 1] }}</span>
                          </v-chip>
                        </div>
                      </v-col>
                      <v-col cols="6" sm="3" class="py-0 px-lg-3 px-md-0 px-sm-1 px-0">
                        <div>
                          <span class="pr-1 font-weight-bold text-body-2">给分情况</span>
                          <v-chip x-small label :color="statics.color[comment.score[3] - 1]" class="px-1">
                            <span class="text-caption white--text">{{ statics.grade[3][comment.score[3] - 1] }}</span>
                          </v-chip>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col class="pa-0" cols="4">
                  <v-container>
                    <v-row class="d-flex justify-end">
                      <v-col class="py-0 mr-sm-n6" cols="12" sm="4" md="5" lg="4">
                        <v-icon size="16">
                          {{ statics.icons.mdiAccountOutline }}
                        </v-icon>
                        <span class="text-caption">
                          {{ comment.user_nickname }}
                        </span>
                      </v-col>
                      <v-col class="py-0" cols="12" sm="6" lg="5" xl="6">
                        <v-icon size="16">
                          {{ statics.icons.mdiClockOutline }}
                        </v-icon>
                        <span class="text-caption">
                          {{ semester }}
                        </span>
                      </v-col>
                    </v-row>
                  </v-container>
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
import useCommentCardContent from "@/composables/users/comment/useCommentCardContent"
import TextContainer from "@/components/users/comment/TextContainer"

export default {
  components: { TextContainer },
  props: { comment: Object },
  setup() {
    const { statics } = useCommentCardContent()
    return { statics }
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint
    }    
  },
  computed: {
    semester() {
      let sem = new String(this.comment.semester)
      let year = sem.substring(0, 4)
      let season = sem.substring(4)
      return `${year}年${season == "02" ? "秋" : "春"}`
    }
  }
}
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
