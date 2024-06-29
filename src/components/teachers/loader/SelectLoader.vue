<template>
  <v-card class="px-lg-0 px-4" outlined flat :width="width" :height="height">
    <v-container>
      <v-row class="pt-lg-2 pt-4">
        <v-col
          md="2"
          sm="3"
          cols="6"
          class="pb-0 pt-lg-3 pt-0 pl-4"
          style="max-width: 140px; min-width: 130px"
        >
          <v-sheet
            class="mt-1"
            color="#e2e2e2"
            height="13px"
            width="60%"
          ></v-sheet>
          <v-sheet class="mt-2 mb-4" color="#e2e2e2" height="29px"></v-sheet>
        </v-col>
        <v-col
          md="2"
          sm="3"
          cols="6"
          class="pb-0 pt-lg-3 pt-0"
          style="max-width: 140px; min-width: 130px"
        >
          <v-sheet
            class="mt-2 mb-1"
            color="#e2e2e2"
            height="29px"
            style="transform: translate(0, 17px)"
          ></v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
export default {
  props: {
    width: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '',
    },
  },
};
</script>
