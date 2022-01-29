<template>
  <div>
    <div class="upper-wrp" >
      <detail-card> </detail-card>
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
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  height: 40vh;
  width: 100%;
  background: rgba(242, 243, 247, 0.8);
}
</style>
