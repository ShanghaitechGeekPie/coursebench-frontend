<template>
  <v-hover #default="{ hover }" close-delay="50" open-delay="50">
    <v-card class="transition-swing" :elevation="hover ? 8 : 4">
      <v-card-text class="pa-0">
        <v-container>
          <v-row class="py-sm-0 py-2">
            <v-col class="py-sm-2 py-0 px-sm-5 px-2 pt-sm-4" cols="3" sm="12">
              <span class="text-sm-h5 text-subtitle-1 font-weight-black">统计</span>
            </v-col>
            <v-col class="py-sm-2 px-sm-5 px-2 pb-sm-4 pb-0" style="padding-top: 2px;" cols="9" sm="12">
              <span class="pr-1">
                <v-icon size="18" class="mt-sm-n1">{{ statics.icons.mdiArchive }}</v-icon>
              </span>
              <span class="text-sm-subtitle-1 font-weight-black pr-4">
                开课总数
              </span>
              <span>
                {{ coursesStatistic.total }}
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
<script>
import useStatisticBox from "@/composables/teachers/courses/useStatisticBox";

export default {
  setup() {
    const { coursesStatistic, statics, status } = useStatisticBox();
    return { coursesStatistic, statics, status };
  },
};
</script>