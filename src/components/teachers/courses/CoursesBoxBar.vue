<template>
  <v-card tile elevation="4">
    <v-card-text class="px-sm-4 px-2 py-3">
      <v-container>
        <v-row>
          <v-col sm="2" class="pa-0" order-sm="0" order="0">
            <v-avatar tile color="pink" size="38" class="rounded">
              <span
                class="text-sm-h3 text-h5"
                v-if="teacherProfile.avatar === ''"
                >{{ teacherProfile.name.slice(0, 1) }}</span
              >
              <v-img
                :src="teacherProfile.avatar"
                alt="Avatar"
                aspect-ratio="1"
                v-else
              ></v-img>
            </v-avatar>
            <span class="text-body-1 font-weight-bold pl-2">{{
              teacherProfile.name
            }}</span>
          </v-col>
          <v-col sm="8" cols="12" class="pa-0" order-sm="1" order="2">
            <span class="text-h6">{{ course.title }}</span>
          </v-col>
          <v-col sm="2" class="pa-0 d-flex justify-end" order-sm="2" order="1">
            <router-link :to="`course/${course.course}`">
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
    const { teacherProfile, statics, status } = useCoursesBoxBar();
    return { teacherProfile, statics, status };
  }, 
  props: {
    course: Object, 
  }
}
</script>