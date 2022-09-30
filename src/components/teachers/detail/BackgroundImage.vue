<template>
  <div>
    <v-img
      v-if="src !== ''"
      alt="Background Image"
      :src="src"
      :height="$vuetify.breakpoint.xsOnly ? 91 : $vuetify.breakpoint.mdAndDown ? 121 : 211"
    ></v-img>    
    <v-sheet
      v-else
      :color="color"
      :height="$vuetify.breakpoint.xsOnly ? 91 : $vuetify.breakpoint.mdAndDown ? 121 : 211"
    ></v-sheet>
  </div>
</template>
<script>

export default {
  props: {
    src: {
      type: String,
      default: "", 
    },
    color: {
      type: String,
      default: "", 
    },
  }
};
</script>
