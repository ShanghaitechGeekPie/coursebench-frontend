<template>
  <div>
    <div class="upper-wrp d-flex justify-center align-end">
      <DetailCard class="mt-3 mt-sm-15" />
    </div>
    <div class="review-wrp">
      <v-tabs centered>
        <v-tab>All Groups</v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import DetailCard from '@/components/courses/DetailCard.vue'

export default {
  components: { DetailCard },
  data() {
    return {
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
