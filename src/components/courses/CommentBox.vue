<template>
  <v-container>
    <v-card class="my-5 pl-5" elevation="0" max-width="800px" width="100vw">
      <v-row align="center" style="width: 100%;">
        <v-avatar color="pink" size="38">
          <v-img
              :src="userProfile.avatar"
              alt="Avatar"
              aspect-ratio="1"
          ></v-img>
        </v-avatar>
        <div class="mx-2 text-body-2">
          {{ comment.is_anonymous ? "匿名用户" : comment.user_nickname }}
        </div>
        <v-rating
            class="d-flex"
            background-color="yellow darken-2"
            color="yellow darken-2"
            length="5"
            readonly
            size="23"
            value="3"
            dense
        ></v-rating>
        <v-col class="text-end text-body-2" style="color: gray">
          {{ comment.time }}
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-card elevation="0">
          <v-card-title class="font-weight-black text-body-1">{{ comment.title }}</v-card-title>
          <v-card-text>
            <div v-html="useMarkdown(comment.comment)">
            </div>
            <v-subheader>
              <v-row>
                <v-col class="pl-1">
                  <div class="d-flex">
                    <v-btn
                        icon
                        :color="status.liked ? 'light-blue' : 'gray'"
                        x-small
                    >
                      <v-icon class="mr-1">{{statics.icons.mdiThumbUp}}</v-icon>
                    </v-btn>
                    <div class="font-weight-medium" :class="status.liked ? 'light-blue--text' : 'grey--text'">
                      {{status.likedNum}}
                    </div>
                  </div>
                </v-col>
                <v-col
                    v-for="(name, index) in statics.scoreNames" :key="index"
                >
                  <div class="d-flex flex-row text-no-wrap">
                    <div class="font-weight-bold text-body-2 px-3">{{name}}</div>
                    <div>{{ comment.score[index].toFixed(1) }}</div>
                  </div>
                </v-col>
              </v-row>
            </v-subheader>
          </v-card-text>
        </v-card>
      </v-row>
    </v-card>
    <v-divider></v-divider>
  </v-container>
</template>
<script>
import useCommentBox from "@/composables/courses/comment/useCommentBox";
import useMarkdown from '@/composables/global/useMarkdown'
import colors from "vuetify/lib/util/colors"

export default {
  setup() {
    const {userProfile, statics, status} = useCommentBox();
    return {userProfile, statics, status, useMarkdown, colors};
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
