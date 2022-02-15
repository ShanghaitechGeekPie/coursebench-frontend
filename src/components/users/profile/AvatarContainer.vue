<template>
  <div>
    <v-avatar
      :tile="tile"
      :color="color"
      :size="size"
      :class="[tile ? 'rounded' : '']"
    >
      <span
        :class="[
          !small
            ? 'text-sm-h3 text-h5'
            : name.length >= 3
            ? 'text-body-2'
            : 'text-body-1',
          'white--text',
        ]"
        v-if="src === ''"
        >{{ name }}</span
      >
      <v-img :src="src" alt="Avatar" :aspect-ratio="aspectRatio" v-else></v-img>
    </v-avatar>
  </div>
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
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>