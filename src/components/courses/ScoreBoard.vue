<template>
  <div>
    <ScoreLine :starNum="5" :percentage="60" style="max-height: 13px"></ScoreLine>
    <ScoreLine :starNum="4" :percentage="3 " style="max-height: 13px"></ScoreLine>
    <ScoreLine :starNum="3" :percentage="2 " style="max-height: 13px"></ScoreLine>
    <ScoreLine :starNum="2" :percentage="5 " style="max-height: 13px"></ScoreLine>
    <ScoreLine :starNum="1" :percentage="30" style="max-height: 13px"></ScoreLine>
  </div>
</template>

<script>

import ScoreLine from "@/components/courses/ScoreLine";
export default {
  components: {ScoreLine},
  props: {
    fontColor: String,
    text: String,
    value: String
  },
  setup() {

  }
}
</script>

<style scoped>
</style>
