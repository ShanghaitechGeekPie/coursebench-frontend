<template>
  <v-container class="py-1">
    <v-card class="my-5 pl-5 pt-0" elevation="0" max-width="800px" width="100vw">
      <v-row class="pl-3" align="center" style="width: 100%;">
        <v-avatar color="gray" size="38">
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
        <v-col class="text-end text-body-2 d-sm-block d-none" style="color: gray">
          {{ comment.time }}
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-card elevation="0">
          <v-card-title class="font-weight-black text-body-1">{{ comment.title }}</v-card-title>
          <v-card-text class="pb-0">
            <div v-html="useMarkdown(comment.comment)">
            </div>
            <v-subheader class="mt-sm-0 my-8 my-sm-0">
              <v-row>
                <v-col
                    v-for="(dim, index) in scoreDims" :key="index"
                    cols="6"
                    sm="2"
                    class="pl-0 py-1 pr-sm-15 d-flex"
                >
                  <div class="d-flex flex-row text-no-wrap align-center">
                    <div class="font-weight-bold text-body-2 px-sm-3 pr-1">{{dim}}</div>
                    <div>{{ comment.score[index].toFixed(1) }}</div>
                  </div>
                </v-col>
                <v-col class="pl-1 pr-sm-15" cols="6" sm="2" order="5" order-sm="first">
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
                <v-col class="d-sm-none py-1 text-body-2 d-flex align-center flex-row-reverse" cols="6" sm="0" order="last" style="color: gray">
                  {{ comment.time }}
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

export default {
  setup() {
    const {userProfile, statics, status, scoreDims} = useCommentBox();
    return {userProfile, statics, status, useMarkdown, scoreDims};
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
