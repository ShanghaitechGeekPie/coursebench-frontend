<template>
  <v-container>
    <v-row justify="center">
      <v-col xl="7" class="px-sm-3 px-0 py-3">
        <Profile />
        <Comment />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Profile from '@/components/users/profile/Profile'
import Comment from '@/components/users/comment/Comment'
import useUser from '@/composables/users/useUser'

export default {
  setup() {
    useUser()
  }, 
  components: {
    Profile, 
    Comment
  }
}
</script>