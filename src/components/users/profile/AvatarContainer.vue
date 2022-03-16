<template>
  <v-card flat :outlined="outlined" :class="[tile ? '' : 'rounded-circle']">
    <v-avatar
      :tile="tile"
      :color="color"
      :size="size"
      :class="[tile ? 'rounded' : '']"
    >
      <span
        :class="[
          !small
            ? size > 50 ? 'text-h3' : 'text-h6'
            : name.length >= 3
            ? 'text-body-2'
            : 'text-body-1',
          fontColor,
        ]"
        v-if="src === ''"
        >{{ name }}</span
      >
      <v-img :src="src" alt="Avatar" :aspect-ratio="aspectRatio" v-else></v-img>
    </v-avatar>
  </v-card>
</template>
<script>
export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
    aspectRatio: {
      type: Number,
      default: 1,
    },
    size: {
      type: [ Number, String ], 
      default: 160,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: "blue",
    },
    fontColor: {
      type: String, 
      default: 'white--text',
    }, 
    small: {
      type: Boolean,
      default: false,
    },
    outlined: {
      default: Boolean, 
      default: false, 
    }
  },
};
</script>