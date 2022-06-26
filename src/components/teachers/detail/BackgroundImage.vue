<template>
  <div>
    <v-sheet
      :color="theme.isDark ? statics.backgroundDark : statics.backgroundLight"
      :height="breakpoint.xsOnly ? 91 : (breakpoint.mdAndDown ? 121 : 211)"
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