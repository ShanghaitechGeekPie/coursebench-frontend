<template>
  <v-lazy>
    <v-hover #default="{ hover }" close-delay="50" open-delay="50">
      <v-card class="mb-3 transition-swing" :elevation="hover ? 8 : 4">
        <CoursesBoxContent :course="course" />
        <CoursesBoxBar :course="course" />
      </v-card>
    </v-hover>
  </v-lazy>
</template>
<script>
import useCoursesBox from "@/composables/teachers/courses/useCoursesBox";
import CoursesBoxContent from '@/components/teachers/courses/CoursesBoxContent'
import CoursesBoxBar from '@/components/teachers/courses/CoursesBoxBar'

export default {
  setup() {
    const { statics, status } = useCoursesBox();
    return { statics, status };
  },
  props: {
    course: Object,
  },
  components: {
    CoursesBoxContent, 
    CoursesBoxBar, 
  }
};
</script>