<template>
  <v-card flat outlined>
    <v-row class="mx-1 mt-3 ">
      <v-col class="pr-1 pl-3" cols="6">
        <v-select dense
                  v-model="status.sortKey"
                  :items="statics.sortKeyItem"
                  style="font-size: 13px"
                  label="排序方式"
        ></v-select>
      </v-col>
      <v-col class="pl-1 pr-3" cols="6">
        <v-select dense
                  v-model="status.order"
                  style="font-size: 13px"
                  :items="statics.orderItem[status.sortKey]"
        ></v-select>
      </v-col>
    </v-row>
    <div class=" mb-4 mt-2">
      <div class="font-weight-regular subtitle-2 mx-2 grey--text text--darken-1">
        <div class="ml-2">按老师筛选:</div>
      </div>
      <div class="ml-5">
        <v-chip-group v-model="selectedTeachers" column multiple active-class="">
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
  </v-card>
</template>

<script>

import useSelectBar from "@/composables/courses/comment/useSelectBar"

export default {
  name: "teacherSelect",
  data() {
    return {
      // selected: []
    };
  },
  setup() {
    const {teachers, status, statics, selectedTeachers } = useSelectBar()
    return {teachers, status, statics, selectedTeachers }
  },
  // watch: {
  //   selected: {
  //     handler() {
  //       console.log(this.selected)
  //       this.selectedTeachers = this.selected
  //     },
  //     immediate: false,
  //     deep: true
  //   },
  // },
  mounted() {
    // setInterval(()=>{
    //   console.log(this.selectedTeachers)
    // }, 1500)
  }
};
</script>

<style scoped></style>
