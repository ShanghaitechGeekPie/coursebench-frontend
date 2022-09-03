<template>
  <div>
    <div class="d-flex flex-column align-center">
      <div>
        <v-progress-circular
          :value="value"
          :size="40"
          :width="6"
          :style="{ 'color': fontColor, 'font-size': '13px' }"
        >{{ value }}</v-progress-circular>
      </div>
      <div :style="{ 'color': fontColor, 'font-size': '14px' }" class="mt-1 font-weight-black">{{ text }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreBoard",
  props: {
    fontColor: String,
    text: String,
    value: String
  }
}
</script>

<style scoped>
</style>
