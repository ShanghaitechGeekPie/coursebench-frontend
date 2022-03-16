<template>
  <div>
    <v-img
      alt="Background Image"
      :src="theme.isDark ? statics.backgroundDark : statics.backgroundLight"
      :height="breakpoint.xsOnly ? 155 : (breakpoint.mdAndDown ? 185 : 275)"
    ></v-img>
  </div>
</template>
<script>
import useBackgroundImage from "@/composables/users/profile/useBackgroundImage.js";

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