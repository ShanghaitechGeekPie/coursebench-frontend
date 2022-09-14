<template>
  <v-card flat outlined >
    <v-row class="mx-1 mt-3">
      <v-col class="" cols="6">
        <v-select dense
                  v-model="status.sortKey"
                  :items="statics.sortKeyItem"
                  label="排序方式"
        ></v-select>
      </v-col>
      <v-col class="" cols="6">
        <v-select dense
                  v-model="status.order"
                  :items="statics.orderItem[status.sortKey]"
        ></v-select>
      </v-col>
    </v-row>
    <div class=" mb-4 mt-2">
      <div class="font-weight-bold mx-2">
        <div class="ml-2">授课老师:</div>
      </div>
      <div class="ml-5">
        <v-chip-group v-model="model" column multiple active-class="">
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
    </div>
    <writing-box></writing-box>
  </v-card>
</template>

<script>

import useSelectBar from "@/composables/courses/comment/useSelectBar"
import WritingBox from "@/components/courses/WritingBox";

export default {
  name: "teacherSelect",
  components: {WritingBox},
  setup() {
    const {teachers, status, statics} = useSelectBar()
    return {teachers, status, statics}
  },
  data() {
    return {
      model: [0, 1, 2, 3, 4, 5, 6],
    };
  },
  mounted() {
  }
};
</script>

<style scoped></style>
