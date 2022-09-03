<template>
  <div>
    <v-sheet
      :color="$vuetify.theme.isDark ? statics.backgroundDark : statics.backgroundLight"
      :height="$vuetify.breakpoint.xsOnly ? 91 : $vuetify.breakpoint.mdAndDown ? 121 : 211"
    ></v-sheet>
  </div>
</template>
<script>
import useBackgroundImage from "@/composables/teachers/detail/useBackgroundImage.js";

export default {
  setup() {
    const { statics } = useBackgroundImage();
    return { statics };
  },
};
</script>
