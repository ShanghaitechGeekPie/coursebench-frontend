<template>
  <div>
    <v-img
      alt="Background Image"
      :src="statics.background"
      :aspect-ratio="breakpoint.name === 'xs' ? 3.625 : 10"
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
      breakpoint: this.$vuetify.breakpoint
    }
  }
};
</script>