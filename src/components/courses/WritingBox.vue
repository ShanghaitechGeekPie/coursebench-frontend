<template>
  <v-container>
      <v-dialog
          width="800"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              color="blue lighten-1"
              v-bind="attrs"
              v-on="on"
              outlined
          >
            撰写评论
          </v-btn>
        </template>

        <v-card class="pa-3" elevation="0" style="overflow-x: hidden" >
          <v-row class="pl-3" align="center" style="width: 100%;">
            <v-col cols="1">
              <v-avatar color="gray" size="45">
                <v-img
                    :src="userProfile.avatar"
                    alt="Avatar"
                    aspect-ratio="1"
                ></v-img>
              </v-avatar>
            </v-col>
            <v-col cols="11">
              <v-textarea
                  label="发一条友善的评论"
                  auto-grow
                  outlined
                  rows="3"
                  hide-details
              >
              </v-textarea>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-end mt-0 mb-3">
            <v-col
                v-for="(dim, index) in scoreDims"
                :key="index"
                cols="2"
                class="px-0 pb-0"
                align="center"
            >
              <v-text-field
                  class="d-flex mr-0"
                  style="width: 80px"
                  :label="dim"
                  placeholder="0~5"
                  type="number"
              ></v-text-field>
            </v-col>
            <v-col
                cols="2"
                class="d-flex align-center"
            >
              <v-switch
                  class="mt-0"
                  label="匿名"
                  color="info"
                  hide-details
              ></v-switch>
            </v-col>
            <v-col class="px-0 d-flex align-center" cols="2">
              <v-btn color="primary" depressed >
                发表评论
                <v-icon>
                  {{statics.icons.mdiChevronRight}}
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>

import useWritingBox from "@/composables/courses/comment/useWritingBox";

export default {
  name: "WritingBox",
  setup() {
    const {statics, userProfile, scoreDims} = useWritingBox();
    return {statics, userProfile, scoreDims};
  },
}
</script>

<style scoped>

</style>