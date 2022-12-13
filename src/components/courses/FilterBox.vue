<template>
  <v-card flat outlined>
    <v-row class="mx-1 mt-0">
      <div
        class="pr-lg-4 pl-lg-4 pt-lg-4 pb-lg-0 pr-4 pl-3 py-3"
        style="max-width: 140px; min-width: 130px"
      >
        <v-select
          hide-details
          v-model="status.sortKey"
          :items="statics.sortKeyItem"
          style="font-size: 13px"
          label="排序方式"
        ></v-select>
      </div>
      <div
        class="pr-lg-4 pl-lg-4 pb-lg-4 pt-lg-0 pl-1 pr-3 py-3"
        style="max-width: 140px; min-width: 130px"
      >
        <v-select
          hide-details
          v-model="status.order"
          style="font-size: 13px"
          :items="statics.orderItem[status.sortKey]"
        ></v-select>
      </div>
    </v-row>
    <div class="mb-4 mt-2">
      <div
        class="font-weight-regular subtitle-2 mx-2 grey--text text--darken-1"
      >
        <div class="ml-2 ml-lg-3">按老师筛选:</div>
      </div>
      <div class="ml-5">
        <v-chip-group
          v-model="selectedTeachers"
          column
          multiple
          active-class=""
        >
          <v-chip
            v-for="(teacher, index) in teachers"
            :key="index"
            outlined
            class="lighten-1"
            filter
          >
            <div
              class="overflow-ellipsis"
              :style="{
                'max-width': $vuetify.breakpoint.xsOnly
                  ? 'calc(100vw - 64px)'
                  : '',
              }"
            >
              {{ teacher.name }}
            </div>
          </v-chip>
        </v-chip-group>
      </div>
    </div>
  </v-card>
</template>

<script>
import useSelectBar from '@/composables/courses/comment/useSelectBar';

export default {
  setup() {
    const { teachers, status, statics, selectedTeachers } = useSelectBar();
    return { teachers, status, statics, selectedTeachers };
  },
};
</script>

<style scoped>
.overflow-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
