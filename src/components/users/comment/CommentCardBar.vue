<template>
  <v-card flat>
    <v-card-text class="px-sm-4 px-2 py-3 pb-sm-3 pb-0">
      <v-container>
        <v-row class="d-flex justify-space-between">
          <v-col
            sm="4"
            cols="8"
            class="pa-0 d-flex router-container"
            order-sm="0"
            order="0"
            v-if="showType === 'user'"
            @click="$router.push({ path: `course/${comment.course.id}` })"
          >
            <AvatarContainer
              :name="
                statics.short[comment.course.institute] === 'Other'
                  ? '?'
                  : statics.short[comment.course.institute]
              "
              :color="statics.background[comment.course.institute]"
              small
              tile
              size="38"
            />
            <div class="pl-2">
              <div class="text-caption mt-n1">{{ comment.course.code }}</div>
              <div class="text-body-1 font-weight-bold">
                {{ comment.course.name }}
              </div>
            </div>
          </v-col>
          <v-col
            sm="4"
            cols="8"
            class="pa-0 d-flex router-container"
            order-sm="0"
            order="0"
            v-else-if="showType === 'course'"
            @click="$router.push({ path: `/user/${comment.user_id}` })"
          >
            <AvatarContainer
              :name="comment.user_nickname"
              :src="comment.avatar"
              small
              tile
              size="38"
            />
            <div class="pl-2">
              <div class="text-caption mt-n1">
                {{ gradeItems[comment.grade] }}
              </div>
              <div class="text-body-1 font-weight-bold">
                {{ comment.user_nickname }}
              </div>
            </div>
          </v-col>
          <v-col sm="3" class="pa-0 d-flex justify-end">
            <div class="d-flex flex-column">
              <div class="mt-n1">
                <v-icon size="16">
                  {{ statics.icons.mdiUpdate }}
                </v-icon>
                <span class="text-caption">
                  {{ comment.update_time }}
                </span>
              </div>
              <div>
                <v-icon size="16">
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
import AvatarContainer from "@/components/users/profile/AvatarContainer";

export default {
  components: { AvatarContainer },
  setup() {
    const { statics, gradeItems } = useCommentCardBar();
    return { statics, gradeItems };
  },
  props: {
    comment: Object,
    showType: {
      type: String,
      default: "user",
    },
  },
};
</script>
<style scoped>
.router-container:hover {
  cursor: pointer;
}
</style>
