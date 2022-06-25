<template>
  <v-container>
      {{ courses }}
  </v-container>
</template>

<script>
import useCourses from "@/composables/courses/useCourses"
import { onMounted } from "@vue/composition-api"

export default {
  setup() {
    const { courses, getCourses } = useCourses()
    onMounted(getCourses)
    return { courses }
  }
}
</script>