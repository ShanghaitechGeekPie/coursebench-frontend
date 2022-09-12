<template>
  <div>
    <div
      class="d-flex justify-center"
      :style="{ transform: $vuetify.breakpoint.mdAndDown ? 'translate(0, -76px)' : '' }"
    >
      <AvatarContainer
        :name="userProfile.nickname"
        slice
        :src="userProfile.avatar"
        :size="$vuetify.breakpoint.name === 'xs' ? 110 : 120"
        :outlined="$vuetify.breakpoint.mdAndDown"
      />
    </div>
    <div
      class="d-flex justify-center pt-5"
      :style="{ 'margin-top': $vuetify.breakpoint.mdAndDown ? '-76px' : '0' }"
    >
      <div class="text-h5 font-weight-bold single-line-limit">
        {{ userProfile.nickname }}
      </div>
    </div>
    <div
      class="d-flex justify-center pt-3"
      v-if="$route.params.id == global.userProfile.id || !userProfile.anonymous"
    >
      <div class="grey--text text--darken-2">
        <span v-if="userProfile.year && userProfile.year != '暂不透露'">{{ userProfile.year }}级</span>
        <span v-if="userProfile.grade && userProfile.grade != '暂不透露'">{{ userProfile.grade }}</span>
        <span v-if="userProfile.realname">{{ userProfile.realname }}</span>
      </div>
    </div>
    <div class="d-flex justify-center pt-3" v-if="$route.params.id == global.userProfile.id || !userProfile.anonymous">
      <div class="grey--text text--darken-2 single-line-limit">
        <span>{{ userProfile.email }}</span>
      </div>
    </div>
    <div class="d-flex justify-center pt-6"
      v-if="$route.params.id == global.userProfile.id"
    >
      <EditProfile />
    </div>
  </div>
</template>
<script>
import useProfile from "@/composables/users/profile/useProfile";
import EditProfile from "@/components/users/profile/EditProfile";
import AvatarContainer from "@/components/users/profile/AvatarContainer";
import { inject } from 'vue';

export default {
  components: { EditProfile, AvatarContainer },
  setup() {
    const { userProfile } = useProfile();

    const global = inject("global")

    return { userProfile, global };
  },
};
</script>

<style scoped>
.single-line-limit {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
