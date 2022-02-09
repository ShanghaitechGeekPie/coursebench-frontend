<template>
  <v-card tile elevation="0">
    <v-card-title class="pa-sm-4 pa-2 pb-sm-0 py-sm-0">
      <v-container>
        <v-row>
          <v-col cols="12" class="pa-0 d-flex">
            <div class="pr-2" style="transform: translate(0, -1px);">
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
          <v-col class="pa-0">
            <TextContainer :text="comment.comment" markdown dense>
              <v-row>
                <v-col class="pa-0 pl-3 pb-2 pt-4 width-limit" cols="12">
                  <v-icon size="16">
                    {{ statics.icons.mdiSchoolOutline }}
                  </v-icon>
                  <span
                    v-for="(teacher, index) in comment.group.teachers"
                    class="pl-1 router-container"
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
                <v-col class="pa-0" :cols="screen.cols" sm="8">
                  <v-container>
                    <v-row>
                      <v-col cols="6" sm="3" class="py-0 pl-sm-3 pl-2">
                        <div>
                          <span
                            class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                            >课程质量</span
                          >
                          <v-icon size="16">{{
                            statics.grade[comment.score[0] - 1]
                          }}</v-icon>
                        </div>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="3"
                        class="py-0 d-sm-block d-flex justify-end"
                      >
                        <div>
                          <span
                            class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                            >课业负担</span
                          >
                          <v-icon size="16">{{
                            statics.grade[comment.score[1] - 1]
                          }}</v-icon>
                        </div>
                      </v-col>
                      <v-col cols="6" sm="3" class="py-0 pl-sm-3 pl-2">
                        <div>
                          <span
                            class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                            >考核难度</span
                          >
                          <v-icon size="16">{{
                            statics.grade[comment.score[2] - 1]
                          }}</v-icon>
                        </div>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="3"
                        class="py-0 d-sm-block d-flex justify-end"
                      >
                        <div>
                          <span
                            class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                            >给分情况</span
                          >
                          <v-icon size="16">{{
                            statics.grade[comment.score[3] - 1]
                          }}</v-icon>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
                <v-col class="pa-0" cols="4" sm="4">
                  <v-container>
                    <v-row class="d-flex justify-end">
                      <v-col
                        class="py-0 mr-sm-n6"
                        cols="12"
                        sm="4"
                        md="5"
                        lg="4"
                      >
                        <v-icon size="16">
                          {{ statics.icons.mdiAccountOutline }}
                        </v-icon>
                        <span>
                          {{ comment.user_nickname }}
                        </span>
                      </v-col>
                      <v-col class="py-0" cols="12" sm="6" lg="5" xl="6">
                        <v-icon size="16">
                          {{ statics.icons.mdiClockOutline }}
                        </v-icon>
                        <span>
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
import useCommentCardContent from "@/composables/users/comment/useCommentCardContent";
import TextContainer from "@/components/users/comment/TextContainer";

export default {
  setup() {
    const { statics, status } = useCommentCardContent();
    return { statics, status };
  },
  props: {
    comment: Object,
  },
  computed: {
    semester() {
      let sem = new String(this.comment.semester);
      let year = sem.substring(0, 4);
      let season = sem.substring(4);
      return `${year}年${season == "02" ? "秋" : "春"}`;
    },
    screen() {
      if (this.$vuetify.breakpoint.width > 420) {
        return {
          cols: 6,
        };
      } else if (this.$vuetify.breakpoint.width > 360) {
        return {
          cols: 7,
        };
      } else {
        return {
          cols: 8,
        };
      }
    },
  },
  components: {
    TextContainer,
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
.width-limit {
  max-width: 60vw;
}
</style>