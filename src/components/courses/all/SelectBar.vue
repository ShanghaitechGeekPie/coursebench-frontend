<template>
  <v-card
    class="px-lg-0 px-4"
    :style="{ width: adoptiveCardContainerWidth }"
    outlined
    flat
  >
    <v-container>
      <v-row class="pt-lg-2 pt-0">
        <v-col md="2" sm="3" cols="6" class="pb-0 pt-lg-3 pt-0 pl-4"
          style="max-width: 140px"
        >
          <v-select
            v-model="status.sortKey"
            :items="statics.sortKeyItem"
            label="排序方式"
          ></v-select>
        </v-col>
        <v-col md="2" sm="3" cols="6" class="pb-0 pt-lg-3 pt-0"
          style="max-width: 140px"
        >
          <v-select
            v-model="status.order"
            :items="statics.orderItem[status.sortKey]"
          ></v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>
<script>
import useSelectBar from "@/composables/courses/all/useSelectBar";

export default {
  setup() {
    const { statics, status } = useSelectBar();
    return { statics, status };
  },
  computed: {
    adoptiveCardNumber() {
      return Math.min(Math.floor((this.$vuetify.breakpoint.width - 428) / 428), 3);
    },

    adoptiveCardContainerWidth() {
      if (this.$vuetify.breakpoint.smAndDown) {
        return "";
      } else if (this.$vuetify.breakpoint.mdOnly) {
        return (this.adoptiveCardNumber + 1) * 428 + "px"
      } else {
        return this.adoptiveCardNumber * 428 + "px";
      }
    },
  },  
};
</script>
