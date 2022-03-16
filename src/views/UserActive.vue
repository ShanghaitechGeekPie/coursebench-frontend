<template>
  
</template>
<script>
import useUserActive from '@/composables/users/useUserActive'

export default {
  setup(){
    const { status, doCheckActive } = useUserActive()
    return { status, doCheckActive }
  }, 
  mounted() {
    console.log(this.$route.query)
  }
}
</script>