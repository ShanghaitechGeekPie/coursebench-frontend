<template>
  <v-card tile elevation="4">
    <v-card-text class="px-sm-4 px-2 py-3">
      <v-container>
        <v-row>
          <v-col sm="2" class="pa-0" order-sm="0" order="0">
            <v-avatar tile color="pink" size="38" class="rounded">
              <span
                class="text-sm-h3 text-h5"
                v-if="teacherDetail.avatar === ''"
                >{{ teacherDetail.name.slice(0, 1) }}</span
              >
              <v-img
                :src="teacherDetail.avatar"
                alt="Avatar"
                aspect-ratio="1"
                v-else
              ></v-img>
            </v-avatar>
            <span class="text-body-1 font-weight-bold pl-2">{{
              teacherDetail.name
            }}</span>
          </v-col>
          <v-col sm="8" cols="12" class="pa-0 d-sm-block d-flex justify-space-between" order-sm="1" order="2">
            <div class="text-body-1 font-weight-bold overflow">{{ course.name }}</div>
            <div class="text-caption pt-sm-0 pt-1 mt-n1">
              <span class="pr-2">{{ course.code }}</span>
              <span>{{ course.score }}学分</span>
            </div>
          </v-col>
          <v-col sm="2" class="pa-0 d-flex justify-end" order-sm="2" order="1">
            <router-link :to="`course/${ course.id }`">
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
</template>
<script>
import useCoursesBoxBar from "@/composables/teachers/courses/useCoursesBoxBar";

export default {
  setup() {
    const { teacherDetail, statics, status } = useCoursesBoxBar();
    return { teacherDetail, statics, status };
  }, 
  props: {
    course: Object, 
  }
}
</script>
<style scoped>
.overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>