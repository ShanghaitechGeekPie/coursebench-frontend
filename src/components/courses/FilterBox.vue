<template>
  <v-card flat outlined>
    <div class="font-weight-bold mx-2 pt-5">
      <div class="ml-2">授课老师:</div>
    </div>
      <div class="ml-5">
        <v-chip-group v-model="model" column multiple active-class="" >
          <v-chip
              v-for="(teacher, index) in teachers"
              :key="index"
              outlined
              class="lighten-1"
              filter
          >
            {{ teacher.name }}
          </v-chip>
        </v-chip-group>
      </div>
  </v-card>
</template>

<script>

import useSelectBar from "@/composables/courses/comment/useSelectBar"

export default {
  name: "teacherSelect",
  setup() {
    const { teachers } = useSelectBar()
    return {teachers}
  },
  data() {
    return {
      model: [0, 1, 2, 3, 4, 5, 6],
    };
  },
  mounted() {
    console.log(this.teachers)
  }
};
</script>

<style scoped></style>
