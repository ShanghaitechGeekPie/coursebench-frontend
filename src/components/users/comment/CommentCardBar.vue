<template>
  <v-card flat>
    <v-card-text class="px-sm-4 px-2 pt-sm-4 pt-3 pb-sm-3 pb-0">
      <div class="d-flex justify-space-between">
        <slot name="headerAvatar" :localComment="comment">
          <div 
            class="d-flex justify-space-between router-container" 
            @click="$router.push({ path: `course/${comment.course.id}` })"
          >
            <AvatarContainer
              :name="
                instituteInfo[comment.course.institute].name === 'Other'
                  ? '?'
                  : instituteInfo[comment.course.institute].name
              "
              :color="instituteInfo[comment.course.institute].color"
              small
              tile
              size="38"
            />
            <div class="pl-2">
              <div class="text-caption mt-n1">{{ comment.course.code }}</div>
              <div class="text-body-1 font-weight-bold overflow-ellipsis"
                :style="{ 'max-width': $vuetify.breakpoint.xsOnly ? '180px' : '' }"
              >
                {{ comment.course.name }}
              </div>
            </div>          
          </div>
        </slot>
        <slot name="headerNote" :localComment="comment">
          <div class="d-flex justify-end">
            <div class="d-flex flex-column">
              <div class="mt-n1">
                <v-icon size="16">
                  {{ statics.icons.mdiUpdate }}
                </v-icon>
                <span class="text-caption">
                  {{ unixToReadable(comment.update_time) }}
                </span>
              </div>
              <div>
                <v-icon size="16">
                  {{ statics.icons.mdiCommentEditOutline }}
                </v-icon>
                <span class="text-caption">
                  {{ unixToReadable(comment.post_time) }}
                </span>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
import useCommentCardBar from "@/composables/users/comment/useCommentCardBar";
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import { instituteInfo, gradeItems } from "@/composables/global/useStaticData"
import { unixToReadable } from "@/composables/global/useTimeUtils";

export default {
  components: { AvatarContainer },
  setup() {
    const { statics } = useCommentCardBar();
    return { statics, instituteInfo, gradeItems, unixToReadable };
  },
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
};
</script>
<style scoped>
.router-container:hover {
  cursor: pointer;
}

.overflow-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
