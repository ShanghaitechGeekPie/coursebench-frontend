<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="7" class="px-sm-3 px-0 py-3">
        <Detail />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import useTeachers from '@/composables/teachers/useTeachers'
import Detail from '@/components/teachers/detail/Detail'

export default {
  setup() {
    useTeachers()
  }, 
  components: {
    Detail,  
  }
}
</script>