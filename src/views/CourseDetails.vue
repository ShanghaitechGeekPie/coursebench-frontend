<template>
  <div>
    <div class="upper-wrp d-flex justify-center align-end">
      <detail-card class="mt-3 mt-sm-15"> </detail-card>
    </div>
    <div class="review-wrp">
      <v-tabs centered>
        <v-tab>
          All Groups
        </v-tab>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import detailCard from '@/components/courses/detailCard.vue'

export default {
  components: {
    'detail-card': detailCard
  },
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
