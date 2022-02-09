<template>
  <v-sheet tile height="200" :color="statics.background[course.institute]" class="d-flex justify-center">
    <div class="d-flex justify-center flex-column">

    </div>
  </v-sheet>
</template>
<script>
import useCourseBoxContent from "@/composables/teachers/courses/useCoursesBoxContent";

export default {
  setup() {
    const { statics, status } = useCourseBoxContent();
    return { statics, status };
  },
  props: {
    course: Object,
  },
  computed: {
      screen() {
        return this.$vuetify.breakpoint.name === "xs"
          ? {
              avatar: 80,
              background: 3.625,
              logo: {
                width: 180, 
                height: 60
              },
            }
          : {
              avatar: 160,
              background: 4.7375,
              logo: {
                width: 300, 
                height: 100
              }
            };
      },
    },
  };
</script>