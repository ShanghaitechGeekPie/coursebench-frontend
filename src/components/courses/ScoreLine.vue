<template>
  <v-row class="pr-2" no-gutters>
    <v-col
        cols="3"
        class="d-flex align-center justify-end pr-1"
        style="transform: translate(0px, -3px)"
    >
      <v-rating
          dense
          :empty-icon="''"
          :full-icon="statics.icons.mdiStar"
          hover
          :length="starNum"
          readonly
          size="16"
          :value="starNum"
          color="yellow darken-3"
          background-color="grey lighten-2"
      ></v-rating>
    </v-col>
    <v-col cols="8" class="d-flex align-center">
      <v-progress-linear
          :color="color"
          :value="percentage"
          height="4"
      >
      </v-progress-linear>
    </v-col>
  </v-row>
</template>

<script>

import useScoreLine from "@/composables/courses/comment/useScoreLine";

export default {
  props: {
    starNum: Number,
    percentage: Number,
    color: String
  },
  setup() {
    const { statics } = useScoreLine()
    return { statics }
  }
}
</script>

<style scoped>
</style>
