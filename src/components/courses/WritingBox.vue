<template>
  <v-container>
    <v-dialog width="800">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue lighten-1" v-bind="attrs" v-on="on" outlined> 写评论</v-btn>
      </template>

      <v-card class="pa-3" elevation="0" style="overflow: hidden">
        <v-row class="pl-3 py-3" align="center" style="width: 100%">
          <v-col cols="1">
            <v-avatar color="gray" size="45">
              <v-img :src="userProfile.avatar" alt="Avatar" aspect-ratio="1"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="11">
            <v-text-field label="标题" class="font-weight-bold" v-model="formStatus.title"></v-text-field>
          </v-col>
        </v-row>
        <v-textarea label="发一条友善的评论" auto-grow outlined rows="3" class="px-4" messages="支持markdown" v-model="formStatus.content">
        </v-textarea>
        <v-row class="d-flex justify-end mt-0 mb-3 px-9">
          <v-col v-for="(dim, index) in judgeItems" :key="index" cols="6" class="pb-0" align="center">
            <v-slider
                v-model="formStatus.slider[index]"
                class="align-center"
                max="5"
                min="1"
                step="1"
                :color="gradingInfo.color[formStatus.slider[index] - 1]"
                track-color="grey"
                thumb-label
                hide-details
                :label="dim"
            >
              <template v-slot:append>
                <v-chip
                    x-small
                    label
                    :color="gradingInfo.color[formStatus.slider[index] - 1]"
                    class="px-1"
                >
                            <span class="text-caption white--text">{{
                                statics.grade[index][formStatus.slider[index] - 1]
                              }}</span>
                </v-chip>
                <!--                <div class="pl-2">-->
                <!--                  {{ statics.grade[index][] }}-->
                <!--                </div>-->
                <!--                <div class="pl-2">-->
                <!--                  {{ satisfactionEmojis[slider[index] - 1] }}-->
                <!--                </div>-->
              </template>
              <template v-slot:thumb-label="{ value }">
                {{ satisfactionEmojis[value - 1] }}
              </template>
            </v-slider>
          </v-col>
        </v-row>
        <v-row class="d-flex flex-row justify-end align-center">
          <v-col cols="3">
            <v-select v-model="target" :items="selections" label="评价对象"></v-select>
          </v-col>
          <v-col cols="2" class="d-flex">
            <v-switch class="mt-0" label="匿名" color="info" hide-details></v-switch>
          </v-col>
          <v-col class="px-0 d-flex" cols="2">
            <v-btn color="primary" depressed @click="doSubmit">
              发表评论
              <v-icon>
                {{ statics.icons.mdiChevronRight }}
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import useWritingBox from "@/composables/courses/comment/useWritingBox"

export default {
  name: "WritingBox",
  setup() {
    const {statics, userProfile, judgeItems, teachers, gradingInfo, doSubmit, formStatus } = useWritingBox()
    return {statics, userProfile, judgeItems, teachers, gradingInfo, doSubmit, formStatus }
  },
  data() {
    return {
      satisfactionEmojis: ["😭", "☹️", "🙁", "🙂", "😊"],
      target: "",
    }
  },
  computed: {
    selections() {
      let res = []
      this.teachers.forEach(function (e) {
        res.push(e.name)
      })
      return res
    }
  },
  methods: {},
  // watch: {
  //   formStatus: {
  //     handler() {
  //       console.log("HHH")
  //     },
  //     deep: true
  //   }
  // },
  mounted() {
  }
}
</script>

<style scoped></style>
