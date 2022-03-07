<template>
  <v-container>
    <Loading v-if="fetchStatus === 'loading'" />
    <Failed v-else-if="fetchStatus === 'error'" />
    <v-row v-else>
      <v-col cols="12" md="4" order-md="last">
        <v-card>
          <v-card-text>
            <v-checkbox
              v-model="iterator.disableFiltering"
              :label="`Filter Disabled: ${iterator.disableFiltering.toString()}`"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="8" order-md="first">
        <v-data-iterator
          :items="courses"
          :page="iterator.pageNow"
          :custom-filter="coursesMatchingFilter"
          :disable-filtering="iterator.disableFiltering"
          :items-per-page="iterator.itemsPerPage"
          sort-by="id"
          hide-default-footer
        >
          <template #default="props">
            <v-card v-for="course in props.items" :key="course.id" class="mb-4">
              <v-card-title>
                <router-link :to="getCourseLinkPath(course.id)">{{ course.name }}</router-link>
                <v-spacer></v-spacer>
                <!--
                <v-checkbox
                  v-model="course.checked"
                  :label="`Checked: ${course.checked.toString()}`"
                ></v-checkbox>
                -->
              </v-card-title>
              <v-card-text>{{ course.id }}</v-card-text>
            </v-card>
          </template>
          <template #footer>
            <v-pagination
              v-model="iterator.pageNow"
              v-if="iterator.showPagination"
              :length="iterator.numberOfPages"
            ></v-pagination>
          </template>
          <template #no-results>
            <v-card>
              <v-card-title>Whoops</v-card-title>
              <v-card-text>No items filtered</v-card-text>
            </v-card>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loading from "@/components/global/Loading"
import Failed from "@/components/global/Failed"
import useCourses from "@/composables/courses/useCourses"
import { onMounted } from "@vue/composition-api"

export default {
  components: { Loading, Failed },
  setup() {
    const { courses, iterator, getCourses, getCourseLinkPath, getNumberOfPages, coursesMatchingFilter, fetchStatus } = useCourses()
    onMounted(getCourses)
    return { courses, iterator, getCourseLinkPath, getNumberOfPages, coursesMatchingFilter, fetchStatus }
  }
}
</script>