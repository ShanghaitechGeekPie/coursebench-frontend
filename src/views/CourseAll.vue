<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" order-md="last">
        <v-card>
          <v-card-text>
            <v-checkbox
              v-model="disableFiltering"
              :label="`Filter Disabled: ${disableFiltering.toString()}`"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" order-md="first">
        <v-data-iterator
          :items="courses"
          :page="pageNow"
          :custom-filter="coursesMatchingFilter"
          :disable-filtering="disableFiltering"
          :items-per-page="itemsPerPage"
          sort-by="id"
          hide-default-footer
        >
          <template #default="props">
            <v-card v-for="course in props.items" :key="course.id" class="mb-4">
              <v-card-title>
                <router-link :to="getCourseLinkPath(course.id)">{{ course.name }}</router-link>
                <v-spacer></v-spacer>
                <v-checkbox
                  v-model="course.checked"
                  :label="`Checked: ${course.checked.toString()}`"
                ></v-checkbox>
              </v-card-title>
              <v-card-text>{{ course.id }}</v-card-text>
            </v-card>
          </template>
          <template #footer>
            <v-pagination v-model="pageNow" :length="numberOfPages"></v-pagination>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import useCourses from "@/composables/courses/useCourses"
import { onMounted } from "@vue/composition-api"

export default {
  setup() {
    const { courses, pageNow, itemsPerPage, getCourses, getCourseLinkPath, coursesMatchingFilter, numberOfPages, disableFiltering } = useCourses()
    onMounted(getCourses)
    return { courses, pageNow, itemsPerPage, disableFiltering, getCourseLinkPath, coursesMatchingFilter, numberOfPages }
  }
}
</script>