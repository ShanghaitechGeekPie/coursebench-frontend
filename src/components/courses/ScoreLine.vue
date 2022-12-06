<template>
  <v-row class="" no-gutters>
    <v-col
      cols="3"
      sm="2"
      md="3"
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
        :color="starColor"
        background-color="grey lighten-2"
      ></v-rating>
    </v-col>
    <v-col
      cols="9"
      sm="10"
      md="9"
      class="d-flex align-center"
      style="max-width: 500px"
    >
      <v-progress-linear :color="color" :value="percentage" height="4">
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
    color: {
      type: String,
      default: "grey",
    },
    starColor: {
      type: String,
      default: "yellow darken-3",
    },
  },
  setup() {
    const { statics } = useScoreLine();
    return { statics };
  },
};
</script>

<style scoped>
</style>
