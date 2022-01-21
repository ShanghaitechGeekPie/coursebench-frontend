<template>
  <v-container>
    <v-profile></v-profile>
  </v-container>
</template>

<script>
import Profile from '@/components/users/profile/Profile'
export default {
  components: {
    "v-profile": Profile
  }
}
</script>