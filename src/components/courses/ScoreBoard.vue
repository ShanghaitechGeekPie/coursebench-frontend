<template>
  <div>
    <div v-for="index in [1, 2, 3, 4, 5]" >
      <ScoreLine :starNum="6 - index" :percentage="Math.round(starPercent[index - 1] * 100)" style="max-height: 13px"></ScoreLine>
    </div>
  </div>
</template>

<script>

import ScoreLine from "@/components/courses/ScoreLine";
export default {
  components: {ScoreLine},
  props: {
    starPercent: Array
  },
  setup() {

  }
}
</script>

<style scoped>
</style>
