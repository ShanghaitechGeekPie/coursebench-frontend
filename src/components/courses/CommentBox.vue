<template>
  <v-lazy>
    <v-card class="my-5" elevation="0" max-width="800px">
      <v-row>
        <v-avatar color="pink" size="38">
          <v-img
              :src="userProfile.avatar"
              alt="Avatar"
              aspect-ratio="1"
          ></v-img>
        </v-avatar>
        <div>
          {{comment.is_anonymous ? "Anonymous" : comment.course}}
        </div>
      </v-row>
    </v-card>
    <v-divider>
    </v-divider>
  </v-lazy>
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
