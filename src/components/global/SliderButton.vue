<template>
  <v-hover v-slot="{ hover }" style="height: 100%">
    <div>
      <v-btn
        :absolute="absolute"
        :append="append"
        :block="block"
        :bottom="bottom"
        :color="color"
        :dark="dark"
        :depressed="depressed"
        :disabled="disabled"
        :elevation="elevation"
        :fab="fab"
        :fixed="fixed"
        :height="height ? `calc(${height} - 2px)` : height"
        :href="href"
        :large="large"
        :left="left"
        :light="light"
        :loading="loading"
        :max-height="maxHeight"
        :max-width="maxWidth"
        :min-height="minHeight"
        :min-width="minWidth"
        :outlined="outlined"
        :plain="plain"
        :replace="replace"
        :retain-focus-on-click="retainFocusOnClick"
        :right="right"
        :rounded="rounded"
        :shaped="shaped"
        :small="small"
        :tag="tag"
        :text="text"
        :tile="tile"
        :to="to"
        :top="top"
        :width="width"
        :x-large="xLarge"
        :x-small="xSmall"
        :class="[fontSize]"
      >
        <slot></slot>
      </v-btn>
      <div class="d-flex justify-center">
        <div :style="{ height: '2px', width: sliderWidth }">
          <v-fade-transition>
            <div class="button-slider" v-if="hoverOnly ? hover : true"></div>
          </v-fade-transition>
        </div>
      </div>
    </div>
  </v-hover>
</template>
<script>
export default {
  name: 'SliderButton',
  props: {
    absolute: {
      type: Boolean,
      default: false,
    },
    append: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    depressed: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    elevation: {
      type: [Number, String],
      default: undefined,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    height: {
      type: [Number, String],
      default: undefined,
    },
    href: {
      type: String,
      default: undefined,
    },
    large: {
      type: Boolean,
      default: false,
    },
    left: {
      type: Boolean,
      default: false,
    },
    light: {
      type: Boolean,
      default: false,
    },
    link: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    'max-height': {
      type: [Number, String],
      default: undefined,
    },
    'max-width': {
      type: [Number, String],
      default: undefined,
    },
    'min-height': {
      type: [Number, String],
      default: undefined,
    },
    'min-width': {
      type: [Number, String],
      default: undefined,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    replace: {
      type: Boolean,
      default: false,
    },
    'retain-focus-on-click': {
      type: Boolean,
      default: false,
    },
    right: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    shaped: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'button',
    },
    text: {
      type: Boolean,
      default: false,
    },
    tile: {
      type: Boolean,
      default: false,
    },
    to: {
      type: [String, Object],
      default: undefined,
    },
    top: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [Number, String],
      default: undefined,
    },
    'x-large': {
      type: Boolean,
      default: false,
    },
    'x-small': {
      type: Boolean,
      default: false,
    },
    'hover-only': {
      type: Boolean,
      default: false,
    },
    'slider-width': {
      type: [Number, String],
      default: '100%',
    },
    'font-size': {
      type: String,
      default: '',
    },
  },
};
</script>
<style scoped>
.button-slider {
  background-color: #1976d2;
  height: 100%;
  width: 100%;
}
</style>
