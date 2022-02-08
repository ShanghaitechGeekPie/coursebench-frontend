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
            写评论
          </v-btn>
        </template>

        <v-card class="pa-3" elevation="0" style="overflow: hidden" >
          <v-row class="pl-3 py-3" align="center" style="width: 100%;">
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
              <v-text-field
                  label="标题"
                  class="font-weight-bold"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
              label="发一条友善的评论"
              auto-grow
              outlined
              rows="3"
              class="px-4"
              messages="支持markdown"
          >
          </v-textarea>
          <v-row class="d-flex justify-end mt-0 mb-3 px-9">
            <v-col
                v-for="(dim, index) in scoreDims"
                :key="index"
                cols="6"
                class="pb-0"
                align="center"
            >
              <v-slider
                  v-model="slider[index]"
                  class="align-center"
                  max="5"
                  min="1"
                  step="1"
                  :color="color(index)"
                  track-color="grey"
                  thumb-label
                  hide-details
                  :label="dim"
              >
                <template v-slot:append>
                  <div class="pl-2">
                    {{ satisfactionEmojis[slider[index] - 1] }}
                  </div>
<!--                  <v-text-field-->
<!--                      v-model="slider[index]"-->
<!--                      class="mt-0 pt-0"-->
<!--                      hide-details-->
<!--                      single-line-->
<!--                      type="number"-->
<!--                      readonly-->
<!--                      @change="limitText"-->
<!--                      style="width: 60px"-->
<!--                  ></v-text-field>-->
                </template>
              </v-slider>
<!--              <v-text-field-->
<!--                  class="d-flex mr-0"-->
<!--                  style="width: 80px"-->
<!--                  :label="dim"-->
<!--                  placeholder="0~5"-->
<!--                  type="number"-->
<!--              ></v-text-field>-->
            </v-col>
          </v-row>
          <v-row class="d-flex flex-row justify-end align-center">
            <v-col cols="3">
              <v-select
                  v-model="target"
                  :items="selections"
                  label="评价对象"
              ></v-select>
            </v-col>
            <v-col
                cols="2"
                class="d-flex"
            >
              <v-switch
                  class="mt-0"
                  label="匿名"
                  color="info"
                  hide-details
              ></v-switch>
            </v-col>
            <v-col class="px-0 d-flex" cols="2">
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
    const {statics, userProfile, scoreDims, teachers} = useWritingBox();
    return {statics, userProfile, scoreDims, teachers};
  },
  data() {
    return {
      slider: [5, 5, 5, 5],
      satisfactionEmojis: ['😭', '☹️', '🙁', '🙂', '😊'],
      target: "",
    }
  },
  computed: {
    selections() {
      let res = []
      this.teachers.forEach(
          function (e){
            res.push(e.name);
          }
      )
      return res
    }
  },
  methods: {
    color(index) {
      if (this.slider[index] === 5) return 'indigo'
      if (this.slider[index] === 4) return 'teal'
      if (this.slider[index] === 3) return 'green'
      if (this.slider[index] === 2) return 'orange'
      if (this.slider[index] === 1) return 'red'
      console.log(index)
      this.slider[index] = 5;
    },
    limitText() {
      for(let index = 0, len=this.slider.length; index < len; index++) {
        console.log(index)
        if (!Number.isInteger(this.slider[index])) {
          console.log(this.slider[index])
          this.slider[index] = 5
        }
        if ((this.slider[index] > 5) || (this.slider[index] < 1)) {
          console.log(this.slider[index])
          this.slider[index] = 5
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
