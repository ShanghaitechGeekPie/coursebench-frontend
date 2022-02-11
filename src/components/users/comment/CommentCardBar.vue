<template>
  <v-card tile>
    <v-card-text class="px-sm-4 px-2 py-3 pb-sm-3 pb-0">
      <v-container>
        <v-row class="d-flex justify-space-between">
          <v-col sm="4" cols="8" class="pa-0 d-flex router-container" 
            order-sm="0" order="0" 
            @click="$router.push({ path: `course/${comment.course_id}` })"
          >
            <v-avatar
              tile
              :color="statics.background[comment.course.institute]"
              size="38"
              class="rounded"
            >
              <span :class="[statics.short[comment.course.institute].length >= 3 ? 'text-body-2' : 'text-body-1', 'white--text']">{{
                statics.short[comment.course.institute]
              }}</span>
            </v-avatar>
            <div class="pl-2">
              <div class="text-caption mt-n1">{{
                comment.course.code
              }}</div>
              <div class="text-body-1 font-weight-bold">{{ 
                comment.course.name 
              }}</div>
            </div>
          </v-col>
          <v-col sm="3" class="pa-0 d-flex justify-end">
            <div class="d-flex flex-column">
              <div class="mt-n1">
                <v-icon size="14">
                  {{ statics.icons.mdiUpdate }}
                </v-icon>
                <span class="text-caption">
                  {{ comment.update_time }}
                </span>
              </div>
              <div>
                <v-icon size="14">
                  {{ statics.icons.mdiCommentEditOutline }}
                </v-icon>
                <span class="text-caption">
                  {{ comment.post_time }}
                </span>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script>
import useCommentCardBar from "@/composables/users/comment/useCommentCardBar";

export default {
  setup() {
    const { statics, status } = useCommentCardBar();
    return { statics, status };
  },
  props: {
    comment: Object,
  },
};
</script>
<style scoped>
.router-container:hover {
  cursor: pointer;
}
</style>