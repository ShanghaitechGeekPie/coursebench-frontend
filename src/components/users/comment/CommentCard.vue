<template>
  <v-lazy>
    <v-hover #default="{ hover }" close-delay="50" open-delay="50">
      <v-card class="mb-3 transition-swing" :elevation="hover ? 8 : 4">
        <v-card tile>
          <v-card-title class="pa-sm-4 pa-2 pb-sm-0">
            <v-container>
              <v-row>
                <v-col cols="4" class="pa-0 d-flex justify-start">
                  <span class="text-body-2">
                    {{ comment["user_score"] }}人赞同了该评价
                  </span>
                </v-col>
                <v-col cols="8" class="pa-0 d-flex justify-end">
                  <span class="text-body-2 pr-2">{{
                    comment["course_name"]
                  }}</span>
                  <span class="text-body-2">{{ comment.time }}</span>
                </v-col>
              </v-row>
            </v-container>
          </v-card-title>
          <v-card-text class="pa-0">
            <v-container>
              <v-row>
                <v-col cols="12" class="pa-sm-4 py-sm-2 pt-0 pa-2">
                  <span
                    class="text-body-1 comment-line-limit"
                    style="white-space: pre-wrap"
                  >
                    {{ comment.comment }}
                  </span>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pa-0 pl-sm-1 pb-2" :cols="screen.cols" sm="12">
                  <v-container>
                    <v-row>
                      <v-col cols="6" sm="2" class="py-0">
                        <div>
                          <span
                            class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                            >课程质量</span
                          >
                          <span>{{ comment.score[0].toFixed(1) }}</span>
                        </div>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="2"
                        class="py-0 d-sm-block d-flex justify-end"
                      >
                        <div>
                          <span
                            class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                            >课业负担</span
                          >
                          <span>{{ comment.score[1].toFixed(1) }}</span>
                        </div>
                      </v-col>
                      <v-col cols="6" sm="2" class="py-0">
                        <div>
                          <span
                            class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                            >考核难度</span
                          >
                          <span>{{ comment.score[2].toFixed(1) }}</span>
                        </div>
                      </v-col>
                      <v-col
                        cols="6"
                        sm="2"
                        class="py-0 d-sm-block d-flex justify-end"
                      >
                        <div>
                          <span
                            class="pr-sm-2 pr-1 font-weight-bold text-body-2"
                            >给分情况</span
                          >
                          <span>{{ comment.score[3].toFixed(1) }}</span>
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-card tile elevation="4">
          <v-card-text class="px-sm-4 px-2 py-3">
            <v-container>
              <v-row>
                <v-col sm="2" class="pa-0" order-sm="0" order="0">
                  <v-avatar tile color="pink" size="38" class="rounded">
                    <span
                      class="text-sm-h3 text-h5"
                      v-if="userProfile.avatar === ''"
                      >{{ userProfile.nickname.slice(0, 1) }}</span
                    >
                    <v-img
                      :src="userProfile.avatar"
                      alt="Avatar"
                      aspect-ratio="1"
                      v-else
                    ></v-img>
                  </v-avatar>
                  <span class="text-body-1 font-weight-bold pl-2">{{
                    userProfile.nickname
                  }}</span>
                </v-col>
                <v-col sm="8" cols="12" class="pa-0" order-sm="1" order="2">
                  <span class="text-h6">{{ comment.title }}</span>
                </v-col>
                <v-col
                  sm="2"
                  class="pa-0 d-flex justify-end"
                  order-sm="2"
                  order="1"
                >
                  <router-link :to="`course/${comment.course}`">
                    <v-btn icon elevation="2" outlined color="pink">
                      <v-icon>
                        {{ statics.icons.mdiChevronDoubleRight }}
                      </v-icon>
                    </v-btn>
                  </router-link>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-card>
    </v-hover>
  </v-lazy>
</template>
<script>
import useCommentCard from "@/composables/users/comment/useCommentCard";

export default {
  setup() {
    const { userProfile, statics, status } = useCommentCard();
    return { userProfile, statics, status };
  },
  props: {
    comment: Object,
  },
  computed: {
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
          cols: 12,
        };
      }
    },
  },
};                 
</script>
<style>
.comment-line-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
}
</style>