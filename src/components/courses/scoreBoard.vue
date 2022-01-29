<template>
  <div>
    <div class="d-flex flex-column align-center">
      <div>
        <v-progress-circular
            :value="value"
            :size="40"
            :width="6"
            :style='{"color":fontColor,fontSize:"13px"}'
        >
          {{value}}
        </v-progress-circular>
      </div>
      <div
          :style='{"color":fontColor,fontSize:"10px"}'
          class="mt-1"
      >
        {{text}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scoreBoard",
  props: {
    fontColor: String,
    text: String,
    value: String
  }
}
</script>

<style scoped>

</style>
