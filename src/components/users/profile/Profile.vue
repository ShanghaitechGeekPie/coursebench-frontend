<template>
  <div>
    <div class="d-flex justify-center">
      <AvatarContainer
        :name="isChinese"
        src=""
        :size="breakpoint.name === 'xs' ? 80 : 120"
      />
    </div>
    <div class="d-flex justify-center pt-5">
      <div class="text-sm-h5 font-weight-bold">
        {{ userProfile.nickname }}
      </div>
    </div>
    <div
      class="d-flex justify-center pt-3"
      v-if="
        !(
          !userProfile['show_year'] &
          !userProfile['show_grade'] &
          !userProfile['show_realname']
        )
      "
    >
      <div class="grey--text text--darken-2">
        <span v-if="userProfile.show_year">{{ userProfile.year }}级</span>
        <span v-if="userProfile.show_grade">{{ userProfile.grade }}</span>
        <span v-if="userProfile.show_realname">{{ userProfile.realname }}</span>
      </div>
    </div>
    <div class="d-flex justify-center pt-3" v-if="userProfile.show_email">
      <div class="grey--text text--darken-2">
        <span>{{ userProfile.email }}</span>
      </div>
    </div>
    <div class="d-flex justify-center pt-6">
      <EditProfile />
    </div>
  </div>
</template>
<script>
import useProfile from "@/composables/users/profile/useProfile";
import EditProfile from "@/components/users/profile/EditProfile";
import AvatarContainer from "@/components/users/profile/AvatarContainer";

export default {
  setup() {
    const { userProfile } = useProfile();
    return { userProfile };
  },
  data() {
    return {
      breakpoint: this.$vuetify.breakpoint,
    };
  },
  components: { EditProfile, AvatarContainer },
  computed: {
    isChinese() {
      return escape(this.userProfile.nickname.slice(0, 2)).indexOf("%u") >= 0
        ? this.userProfile.nickname.slice(0, 1)
        : this.userProfile.nickname.slice(0, 2);
    },
  },
};
</script>