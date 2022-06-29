<template>
  <v-container>
    <Loading v-if="fetchStatus === 'loading'" />
    <Failed v-else-if="fetchStatus === 'error'" />
    <v-row v-else>
      <v-col cols="12" lg="4" order-lg="last">
        <v-card class="mb-4">
          <v-card-text>
            <v-checkbox
              v-model="pageProps.disableFiltering"
              :label="`Filter Disabled: ${pageProps.disableFiltering.toString()}`"
            ></v-checkbox>
            <v-text-field
              v-model="searchUtils.searchText.value"
              :error-messages="searchUtils.isRegExpError.value ? 'Invalid regexp pattern!' : []"
              placeholder="Search..."
              outlined
              dense
            >
              <v-icon
                slot="append"
                :color="searchUtils.regExpMode.value ? 'primary' : 'default'"
                @click="searchUtils.regExpMode.value = !searchUtils.regExpMode.value"
              >
                {{ icons.mdiCodeJson }}
              </v-icon>
            </v-text-field>
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            <v-chip class="ma-2" color="primary">生物医学工程学院</v-chip>
            <v-chip class="ma-2" color="primary">创意与艺术学院</v-chip>
            <v-chip class="ma-2">上道书院</v-chip>
            <v-chip class="ma-2">创意与艺术学院</v-chip>
            <v-chip class="ma-2">创意与艺术学院</v-chip>
            <v-chip class="ma-2">创意与艺术学院</v-chip>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" lg="8" order-lg="first">
        <v-data-iterator
          :items="coursesSearched"
          :page="pageProps.pageNow"
          :custom-filter="coursesMatchingFilter"
          :disable-filtering="pageProps.disableFiltering"
          :items-per-page="pageProps.itemsPerPage"
          sort-by="id"
          hide-default-footer
        >
          <template #default="props">
            <v-card v-for="course in props.items" :key="course.id" class="mb-4">
              <v-card-title>
                <router-link :to="getCourseLinkPath(course.id)">{{ course.name }}</router-link>
                <v-spacer></v-spacer>
                {{ course.code }}
              </v-card-title>
              <v-card-subtitle>{{ course.institute }}</v-card-subtitle>
              <v-card-text>
                Score: {{ course.score }}
                <v-checkbox v-model="course.checked" :label="`Checked: ${course.checked.toString()}`"></v-checkbox>
              </v-card-text>
            </v-card>
          </template>
          <template #footer>
            <v-pagination
              v-model="pageProps.pageNow"
              v-if="pageProps.showPagination"
              :length="pageProps.numberOfPages"
              :total-visible="7"
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
import { mdiCodeJson } from "@mdi/js"

import { setCookie, getCookie, setCookies, getCookies, setPreset, getPreset, clearPreset, hasPreset } from "@/composables/global/useCookie"

export default {
  components: { Loading, Failed },
  setup() {
    /*
     *Full test of the useCookie
     */
    const testCookie = () => {
      setCookie("test", "test")
      console.log(getCookie("test"))
      setCookies({ test: "test", test2: "test2" })
      console.log(getCookies(["test", "test2"]))
      setPreset({ id: "1", nickname: "test" })
      console.log(getPreset())
      clearPreset()
      console.log(getCookie("preset"))
      console.log(hasPreset())
    }

    testCookie()

    const {
      coursesSearched,
      fetchStatus,
      pageProps,
      searchUtils,
      fetchCourses,
      getCourseLinkPath,
      getNumberOfPages,
      coursesMatchingFilter
    } = useCourses()
    onMounted(fetchCourses)
    return {
      coursesSearched,
      fetchStatus,
      pageProps,
      searchUtils,
      getCourseLinkPath,
      getNumberOfPages,
      coursesMatchingFilter
    }
  },
  data() {
    return {
      icons: { mdiCodeJson }
    }
  }
}
</script>
