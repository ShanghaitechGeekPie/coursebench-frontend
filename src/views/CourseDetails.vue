<template>
  <div>
    <div class="upper-wrp d-flex justify-center align-end">
      <DetailCard class="mt-sm-10 pb-sm-8 pt-sm-2" />
    </div>
    <div>
      <v-tabs centered v-model="currentTab">
        <v-tab v-for='(item, index) in items' :key="index">{{item.name}}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="currentTab"  class="transparent d-flex align-center justify-center">
        <v-tab-item v-for="(item, index) in items" :key="index">
          <CommentBoard :currentTab="items[currentTab]"></CommentBoard>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </div>
</template>

<script>
import DetailCard from '@/components/courses/DetailCard.vue'
import CommentBoard from "@/components/courses/CommentBoard";

export default {
  components: {
    DetailCard,
    CommentBoard,
  },
  data() {
    return {
      currentTab: 0,
      items: [
        { name: '全部评价'},
        { name: '高盛华' },
        { name: '梁骏睿' },
        { name: '娄鑫' },
        { name: '刘闯' },
        { name: '野兽先辈' },
        { name: '林弘扬' },
        { name: '关云长' },
      ]
    }
  }
}
</script>

<style scoped>
.upper-wrp {
  width: 100%;
  background: rgba(242, 243, 247, 0.8);
}
</style>
