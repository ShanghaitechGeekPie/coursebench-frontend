<template>
  <div>
    <v-img
      alt="Background Image"
      :src="$vuetify.theme.isDark ? statics.backgroundDark : statics.backgroundLight"
      :height="$vuetify.breakpoint.xsOnly ? 91 : $vuetify.breakpoint.mdAndDown ? 121 : 211"
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
};
</script>
