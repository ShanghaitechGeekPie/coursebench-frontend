<template>
  <div class="pa-2">
    <div v-for="index in totalVisible >= 0 ? totalVisible : length"
      :key="index"   
    >
      <div>
        <v-btn :elevation="elevation">1</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    length: {
      type: Number,
      required: true,
    },
    totalVisible: {
      type: Number,
      default: -1,
    },
    elevation: {
      type: [Number, String],
      default: 4,
    },
  }, 
  model: {
    prop: "page",
    event: "change",
  }, 
  computed: {
    middleLocation() {
      return Math.floor(this.totalVisible / 2);
    },
  }
};