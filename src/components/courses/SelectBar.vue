<template>
  <v-row class="pl-5">
    <v-col cols="2">
      <v-select
          v-model="selected"
          :items="items"
          label="排序方式"
      ></v-select>
    </v-col>
    <v-col cols="2">
      <v-select
          v-model="reverse"
          :items="['升序', '降序']"
      ></v-select>
    </v-col>
    <v-col cols="2" class="ml-auto">
      <writing-box> </writing-box>
    </v-col>
  </v-row>
</template>

<script>
import WritingBox from '@/components/courses/WritingBox'

export default {
  name: "SelectBar",
  components: { WritingBox },
  data() {
    return {
      items : ["评分", "时间", "点赞数"],
      selected: "",
      reverse: "降序",
    }
  },
  watch: {
    selected() {
      console.log(this.selected);
    }
  },
  created() {
    this.selected = this.items[2];
  }
}
</script>

<style scoped>

</style>
