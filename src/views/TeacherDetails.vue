<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="7" class="px-sm-3 px-0 py-3">
        <Detail />
        <Courses />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import useTeachers from '@/composables/teachers/useTeachers'
import Detail from '@/components/teachers/detail/Detail'
import Courses from '@/components/teachers/courses/Courses'

export default {
  setup() {
    useTeachers()
  }, 
  components: {
    Detail,  
    Courses, 
  }
}
</script>