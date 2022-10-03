<template>
  <v-card flat :outlined="outlined" :class="[tile ? '' : 'rounded-circle']"
    :width="size"
    :height="size"
  >
    <v-avatar
      :tile="tile"
      :color="color"
      :size="size"
      :class="[tile ? 'rounded' : '']"
    >
      <span
        :class="[
          adoptiveFont(slice ? slicedName : name),
          fontColor,
        ]"
        v-if="src === ''"
        >{{ slice ? slicedName : name }}</span
      >
      <v-img :src="src" alt="Avatar" :aspect-ratio="aspectRatio" v-else></v-img>      
    </v-avatar>
    <slot></slot>
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
      type: [Number, String],
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
      default: "white--text",
    },
    'font-size': {
      type: String,
      default: undefined,
    },    
    small: {
      type: Boolean,
      default: false,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    slice: {
      type: Boolean, 
      default: false
    }
  },
  computed: {
    slicedName() {
      // now we use the simpler policy to slice the name
      return this.name.slice(0, 1).toUpperCase();
      // return escape(this.name.slice(0, 2)).indexOf("%u") >= 0
      //   ? this.name.slice(0, 1)
      //   : this.name.slice(0, 2);
    },
  }, 
  methods: {
    adoptiveFont() {
      if (!this.fontSize) {
        if (!this.small) {
          if (this.size > 50) {
            return "text-h3";
          } else {
            return "text-h6";
          }
        } else {
          if (this.name.length >= 3) {
            return "text-body-2";
          } else {
            return "text-body-1";
          }
        }
      } else {
        return this.fontSize
      }
    }
  }
};
</script>