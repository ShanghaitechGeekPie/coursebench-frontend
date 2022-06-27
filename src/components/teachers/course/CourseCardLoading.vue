<template>
  <v-lazy class="px-3">
    <div
      :style="{
        width: breakpoint.mdAndDown
          ? breakpoint.xsOnly
            ? 'calc(100vw - 24px)'
            : 404 * 2 > breakpoint.width
            ? '300px'
            : '404px'
<<<<<<< HEAD
          : '404px',
=======
          : '404px'
>>>>>>> 489b771 (Unusable login and register page)
      }"
    >
      <v-card class="mb-3" flat height="303" outlined>
        <v-container>
          <v-row class="d-flex justify-space-between">
            <v-col class="d-flex justify-space-between">
              <div style="transform: translate(8px, 0)">
<<<<<<< HEAD
                <AvatarContainer
                  color="#e2e2e2"
                  font-size="text-body-1"
                  size="45"
                />
              </div>
              <div class="pr-2">
                <v-sheet
                  class="my-1"
                  color="#e2e2e2"
                  width="72.67px"
                  height="14px"
                ></v-sheet>
                <v-sheet
                  class="my-1"
                  color="#e2e2e2"
                  width="72.67px"
                  height="14px"
                ></v-sheet>
=======
                <AvatarContainer color="#e2e2e2" font-size="text-body-1" size="45" />
              </div>
              <div class="pr-2">
                <!-- <div class="text-caption">{{ course.code }}</div>
                  <div class="text-caption" style="text-align: end">
                    {{ course.credit }}学分
                  </div> -->
>>>>>>> 489b771 (Unusable login and register page)
              </div>
            </v-col>
          </v-row>
        </v-container>
<<<<<<< HEAD
        <v-container>
          <v-row>
            <v-col cols="12" class="pt-0">
              <div class="router-container d-flex">
                <v-sheet
                  class="my-1 ml-2"
                  color="#e2e2e2"
                  width="160px"
                  height="16px"
                ></v-sheet>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div v-for="index in 4" :key="index">
=======
        <!-- <v-container>
            <v-row>
              <v-col cols="12" class="pt-0">
>>>>>>> 489b771 (Unusable login and register page)
                <div
                  :class="[
                    'd-flex',
                    'justify-space-between',
                    'px-2',
                    index == 1 ? 'pb-3' : 'py-3',
                  ]"
                >
                  <v-sheet
                    class="my-1"
                    color="#e2e2e2"
                    width="100%"
                    height="16px"
                  ></v-sheet>
                </div>
<<<<<<< HEAD
              </div>
            </v-col>
          </v-row>
        </v-container>
=======
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>
                  <div class="d-flex justify-space-between px-2 pb-3">
                    <div class="text-body-2" style="min-width: 57px">
                      课程质量
                    </div>
                    <div style="width: 64%">
                      <v-progress-linear
                        v-model="course.score[0] * 20"
                        :color="statics.color[score[0]]"
                        class="mt-2"
                        style="pointer-events: none;"
                      >
                      </v-progress-linear>
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="statics.color[score[0]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[score[0]]
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-space-between px-2 py-3">
                    <div class="text-body-2" style="min-width: 57px;">作业用时</div>
                    <div style="width: 64%;">
                      <v-progress-linear
                        v-model="course.score[1] * 20"
                        :color="statics.color[score[1]]"
                        class="mt-2"
                        style="pointer-events: none;"
                      >
                      </v-progress-linear>
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="statics.color[score[1]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[score[1]]
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-space-between px-2 py-3">
                    <div class="text-body-2" style="min-width: 57px;">考核难度</div>
                    <div style="width: 64%;">
                      <v-progress-linear
                        v-model="course.score[2] * 20"
                        :color="statics.color[score[2]]"
                        class="mt-2"
                        style="pointer-events: none;"
                      >
                      </v-progress-linear>
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="statics.color[score[2]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[score[2]]
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </div>
                <div>
                  <div class="d-flex justify-space-between px-2 py-3">
                    <div class="text-body-2" style="min-width: 57px;">给分情况</div>
                    <div style="width: 64%;">
                      <v-progress-linear
                        v-model="course.score[3] * 20"
                        :color="statics.color[score[3]]"
                        class="mt-2"
                        style="pointer-events: none;"
                      >
                      </v-progress-linear>
                    </div>
                    <div>
                      <v-chip
                        x-small
                        label
                        :color="statics.color[score[3]]"
                        class="px-1 mt-n2"
                      >
                        <span class="text-caption white--text">{{
                          statics.label[score[3]]
                        }}</span>
                      </v-chip>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-container> -->
>>>>>>> 489b771 (Unusable login and register page)
      </v-card>
    </div>
  </v-lazy>
</template>
<script>
import AvatarContainer from "@/components/users/profile/AvatarContainer"

export default {
  data: () => ({
    breakpoint: this.$vuetify.breakpoint
  }),
  components: {
    AvatarContainer
  }
}
</script>

<style scoped>
.router-container:hover {
  cursor: pointer;
}

.overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>