<template>
  <div>
    <div
      class="d-flex justify-center"
      :style="{ transform: breakpoint.mdAndDown ? 'translate(0, -76px)' : '' }"
    >
      <AvatarContainer
        color="#e2e2e2"
        :size="breakpoint.name === 'xs' ? 110 : 120"
        :outlined="breakpoint.mdAndDown"
      />
    </div>
    <div
      class="d-flex justify-center pt-5"
      :style="{ 'margin-top': breakpoint.mdAndDown ? '-76px' : '0' }"
    >
      <v-sheet class="my-1" color="#e2e2e2" height="30px" width="100px"></v-sheet>
    </div>
    <div class="d-flex justify-center pt-3">
      <v-sheet class="my-1" color="#e2e2e2" height="20px" width="120px"></v-sheet>
    </div>
    <div class="d-flex justify-center pt-3">
      <v-sheet class="my-1" color="#e2e2e2" height="20px" width="160px"></v-sheet>
    </div>
    <div class="d-flex justify-center pt-3 px-4">
      <v-sheet class="my-1" color="#e2e2e2" height="20px" width="120px"></v-sheet>
    </div>
  </div>
</template>
<script>
// TODO: Replace this with skeleton loader

import AvatarContainer from "@/components/users/profile/AvatarContainer";

export default {
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
    };
  },
  components: { AvatarContainer },
};
</script>