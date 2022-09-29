<template>
  <div>
    <div class="d-flex justify-center">
      <v-icon size="56">{{ statics.icons.mdiAlertDecagram }}</v-icon>
    </div>
    <div class="d-flex justify-center pt-3">
      <div class="text-h6 font-weight-bold grey--text text--darken-2">
        这里什么都没有...
      </div>
    </div>
  </div>
</template>
<script>
import { mdiAlertDecagram } from "@mdi/js";

export default {
  setup() {
    const statics = {
      icons: {
        mdiAlertDecagram,
      },
    };

    return { statics }
  },
};
</script>