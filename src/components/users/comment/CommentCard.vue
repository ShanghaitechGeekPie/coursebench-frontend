<template>
  <v-lazy>
    <v-hover v-slot="{ hover }" close-delay="50" open-delay="50">
      <v-card class="mb-3" :elevation="hover ? 8 : 2">
        <v-card-title class="pa-sm-4 pa-2">
          <span class="text-subtitle-1 font-weight-bold">{{ comment.title }}</span>
        </v-card-title>
        <v-card-text class="px-sm-4 px-2 pb-sm-4 pb-2">
          <v-container>
            <v-row>
              <v-col cols="4" class="pa-0">
                <v-avatar tile color="pink" size="38" class="rounded">
                  <span
                    class="text-sm-h3 text-h5"
                    v-if="commentUserProfile.avatar === ''"
                  >{{ commentUserProfile.nickname.slice(0, 1) }}</span>
                  <v-img :src="commentUserProfile.avatar" alt="Avatar" aspect-ratio="1" v-else></v-img>
                </v-avatar>
                <span class="text-body-1 font-weight-bold pl-2">{{ commentUserProfile.nickname }}</span>
              </v-col>
              <v-col cols="8" class="pa-0 d-flex justify-end">
                <div>
                  <div class="text-body-2">{{ comment["course_name"] }}</div>
                  <div class="text-body-2">{{ comment.time }}</div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pa-0" :cols="screen.cols" sm="12">
                <v-container>
                  <v-row>
                    <v-col cols="6" sm="2" class="px-0 pb-0">
                      <div>
                        <span class="pr-sm-2 pr-1 font-weight-bold text-body-2">课程质量</span>
                        <span>{{ comment.score[0].toFixed(1) }}</span>
                      </div>
                    </v-col>
                    <v-col cols="6" sm="2" class="px-0 pb-0 d-sm-block d-flex justify-end">
                      <div>
                        <span class="pr-sm-2 pr-1 font-weight-bold text-body-2">课业负担</span>
                        <span>{{ comment.score[1].toFixed(1) }}</span>
                      </div>
                    </v-col>
                    <v-col cols="6" sm="2" class="px-0 pb-0 pt-sm-3 pt-0">
                      <div>
                        <span class="pr-sm-2 pr-1 font-weight-bold text-body-2">考核难度</span>
                        <span>{{ comment.score[2].toFixed(1) }}</span>
                      </div>
                    </v-col>
                    <v-col
                      cols="6"
                      sm="2"
                      class="px-0 pb-0 pt-sm-3 pt-0 d-sm-block d-flex justify-end"
                    >
                      <div>
                        <span class="pr-sm-2 pr-1 font-weight-bold text-body-2">给分情况</span>
                        <span>{{ comment.score[3].toFixed(1) }}</span>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
              </v-col>
            </v-row>
            <v-row class="pb-2">
              <v-divider></v-divider>
            </v-row>
            <v-row>
              <v-col cols="12" class="px-0 pt-0">
                <span
                  class="text-body-1 comment-line-limit"
                  style="white-space: pre-wrap"
                >{{ comment.comment }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="pa-0 d-flex justify-space-between">
                <div>
                  <router-link :to="`course/${comment.course}`">
                    <span class="text-body-2 text-decoration-underline">在课程页面中查看</span>
                  </router-link>
                </div>
                <div>
                  <span class="text-body-2">{{ comment["user_score"] }}人赞同了该评价</span>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-lazy>
</template>
<script>
import useCommentCard from "@/composables/users/comment/useCommentCard";

export default {
  setup() {
    const { commentUserProfile, statics, status } = useCommentCard();
    return { commentUserProfile, statics, status };
  },
  props: {
    comment: Object,
  },
  computed: {
    screen() {
      return this.$vuetify.breakpoint.width > 350 ? { cols: 6 } : { cols: (10 - parseInt(this.$vuetify.breakpoint.width / 100)) }
    }
  }
};
</script>
<style>
.comment-line-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>