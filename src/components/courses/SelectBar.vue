<template>
  <v-row class="pl-5">
    <v-col cols="2">
      <v-select v-model="commentOrder.sortBy" :items="items" label="排序方式"></v-select>
    </v-col>
    <v-col cols="2">
      <v-select v-model="commentOrder.reverse" :items="['升序', '降序']"></v-select>
    </v-col>
    <v-col cols="2" class="ml-auto">
      <writing-box> </writing-box>
    </v-col>
  </v-row>
</template>

<script>
import WritingBox from "@/components/courses/WritingBox"
import { inject } from "@vue/composition-api"

export default {
  name: "SelectBar",
  components: { WritingBox },
  setup() {
    const commentOrder = inject("commentOrder")
    return { commentOrder }
  },
  data() {
    return {
      items: ["评分", "时间"]
    }    
  }
}
</script>

<style scoped></style>
