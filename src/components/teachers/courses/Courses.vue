<template>
  <v-container class="py-sm-3 py-0">
    <v-row>
      <v-col cols="12" md="3" order-md="last" class="px-sm-0 px-0 pt-6 pt-sm-3">
        <StatisticBox />
      </v-col>
      <v-col
        cols="12"
        md="9"
        order-md="first"
        class="pl-sm-0 pr-sm-3 pl-0 pr-0 pt-sm-3 pt-0"
      >
        <CoursesBox
          v-for="(course, index) in coursesDetail"
          :key="index"
          :course="course"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import useCourses from "@/composables/teachers/courses/useCourses";
import StatisticBox from "@/components/teachers/courses/StatisticBox";
import CoursesBox from "@/components/teachers/courses/CoursesBox";

export default {
  setup() {
    const { coursesDetail, statics, status } = useCourses();
    return { coursesDetail, statics, status };
  },
  components: { StatisticBox, CoursesBox },
};
</script>