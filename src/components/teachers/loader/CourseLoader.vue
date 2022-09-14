<template>
  <v-lazy class="px-3">
    <div :style="{ width: width }">
      <v-card class="mb-3" flat :height="height" outlined>
        <v-container v-if="header === 'avatar'">
          <v-row class="d-flex justify-space-between">
            <v-col class="d-flex justify-space-between">
              <div style="transform: translate(8px, 0)">
                <AvatarContainer color="#e2e2e2" font-size="text-body-1" size="45" />
              </div>
              <div class="pr-2">
                <v-sheet class="my-1" color="#e2e2e2" width="72.67px" height="14px"></v-sheet>
                <v-sheet class="my-1" color="#e2e2e2" width="72.67px" height="14px"></v-sheet>
              </div>
            </v-col>            
          </v-row>
        </v-container>
        <v-container v-else-if="header === 'image'">
          <v-row class="d-flex justify-space-between">        
            <v-col class="d-flex justify-space-between pa-0">
              <v-sheet color="#e2e2e2" width="100%" height="69px"></v-sheet>
            </v-col>
          </v-row>
        </v-container>            
        <v-container>
          <v-row>
            <v-col cols="12" :class="[ header === 'image' ? 'pt-8 pb-2' : 'pt-0' ]">
              <div class="router-container d-flex">
                <v-sheet class="my-1 ml-2" color="#e2e2e2" width="160px" height="16px"></v-sheet>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <div v-for="index in header === 'image' ? 3 : 4" :key="index">
                <div :class="['d-flex', 'justify-space-between', 'px-2', index == 1 ? 'pb-3' : 'py-3']">
                  <v-sheet class="my-1" color="#e2e2e2" width="100%" height="16px"></v-sheet>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </div>
  </v-lazy>
</template>
<script>
import AvatarContainer from "@/components/users/profile/AvatarContainer"

export default {
  components: {
    AvatarContainer
  }, 
  props: {
    width: {
      type: String,
      default: ""
    }, 
    height: {
      type: String,
      default: ""
    }, 
    header: {
      type: String, 
      default: "avatar"
    }
  }
}
</script>

<style scoped>
.router-container:hover {
  cursor: pointer;
}

.overflow {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
</style>
