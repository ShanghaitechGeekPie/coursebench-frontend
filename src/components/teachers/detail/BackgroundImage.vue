<template>
  <div>
    <v-sheet
      :color="theme.isDark ? statics.backgroundDark : statics.background"
      :height="breakpoint.xsOnly ? 155 : (breakpoint.mdAndDown ? 185 : 275)"
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
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint, 
      theme: this.$vuetify.theme, 
    }
  }, 
};
</script>