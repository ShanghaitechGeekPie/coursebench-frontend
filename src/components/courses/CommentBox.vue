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
          {{comment.is_anonymous ? "匿名用户" : comment.user_nickname}}
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
          {{comment.time}}
        </v-col>
      </v-row>
      <v-row class="mt-3">
        <v-card elevation="0">
          <v-card-title class="font-weight-black text-body-1" >{{comment.title}}</v-card-title>
          <v-card-text>
            {{comment.comment}}
          </v-card-text>
        </v-card>
      </v-row>
    </v-card>
    <v-divider></v-divider>
  </v-container>
</template>
<script>
import useCommentCard from "@/composables/courses/comment/useCommentCard";

export default {
  setup() {
    const { userProfile, status } = useCommentCard();
    return { userProfile, status };
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
