<template>
  <v-container>
    <v-profile></v-profile>
  </v-container>
</template>

<script>
import profile from '@/components/users/Profile'
export default {
  components: {
    "v-profile": profile
  }
}
</script>