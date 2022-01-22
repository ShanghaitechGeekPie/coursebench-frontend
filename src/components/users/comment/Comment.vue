<template>
  <v-container class="py-sm-3 py-0">
    <v-row>
      <v-col cols="12" md="3" order-md="last" class="px-sm-0 px-0 pt-6 pt-sm-3">
        <v-info-card></v-info-card>
      </v-col>
      <v-col cols="12" md="9" order-md="first" class="pl-sm-0 pr-sm-3 pl-0 pr-0 pt-sm-3 pt-0">
        <v-comt-card
          v-for="(comt, index) in usercomt.comment"
          :key="index"
          :comt="comt"
        ></v-comt-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import useComment from "@/composables/users/comment/useComment";
import InfoCard from '@/components/users/comment/InfoCard'
import ComtCard from '@/components/users/comment/ComtCard'

export default {
  setup() {
    const { usercomt, statics, status } = useComment();
    return { usercomt, statics, status };
  },
  components: {
    'v-info-card': InfoCard, 
    'v-comt-card': ComtCard
  }
};
</script>