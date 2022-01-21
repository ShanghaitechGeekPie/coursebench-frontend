<template>
  <v-card>
    <v-card-text>hi</v-card-text>
  </v-card>
</template>
<script>
import useComtCard from '@/composables/users/comment/useComtCard'

export default {
  setup() {
    const { statics, status } = useComtCard()
    return { statics, status }
  }, 
  props: {
    comt: Object
  }
};
</script>