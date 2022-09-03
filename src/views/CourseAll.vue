<template>
  <div style="min-height: 100%">
    <div style="flex-wrap: wrap" class="d-flex justify-center flex-row-reverse">
      <div class="pa-lg-3">
        <div :style="{ width: $vuetify.breakpoint.mdAndDown ? '100vw' : '360px' }">
          <CourseFilter />
        </div>
      </div>
      <div class="pa-3 px-0">
        !!CARDS!!
      </div>
    </div>
  </div>
</template>

<script>
import CourseFilter from "@/components/courses/all/CourseFilter"

export default {
  components: {
    CourseFilter,
  }
}
</script>
