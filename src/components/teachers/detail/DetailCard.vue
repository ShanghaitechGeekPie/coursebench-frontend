<template>
  <v-col class="pt-1 d-flex justify-space-between">
    <v-row>
      <v-col class="px-sm-3 px-0 pb-sm-3 pb-0">
        <div class="d-flex justify-space-between">
          <div class="text-sm-h3 text-h5 pt-0 pt-sm-5 pl-sm-6 px-sm-4 px-1">
            {{ teacherDetail.name }}
          </div>
        </div>
        <v-list class="mt-sm-n1 mt-n3 py-0 pt-1 pt-sm-4">
          <v-list-item class="px-sm-6 px-2">
            <v-list-item-title class="text-sm-subtitle-1 text-subtitle-2">{{
              teacherDetail.institute
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import useDetailCard from "@/composables/teachers/detail/useDetailCard";

export default {
  setup() {
    const { teacherDetail, statics, status } = useDetailCard();
    return { teacherDetail, statics, status };
  },
};
</script>