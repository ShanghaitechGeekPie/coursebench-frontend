<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="7" class="px-sm-3 px-0 py-3">
        <v-profile></v-profile>
        <v-comment></v-comment>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Profile from '@/components/users/profile/Profile'
import Comment from '@/components/users/comment/Comment'

export default {
  components: {
    "v-profile": Profile, 
    'v-comment': Comment
  }
}
</script>