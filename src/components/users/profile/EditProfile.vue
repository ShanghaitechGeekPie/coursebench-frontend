<template>
  <v-dialog v-model="status.editProfile" max-width="600">
    <v-window v-model="status.step">
      <v-window-item :value="0">
        <EditProfileCard :isMobile="isMobile" @editPassword="status.step++" />
      </v-window-item>
      <v-window-item :value="1">
        <EditPasswordCard
          @next="status.step++"
          @back="status.step--"
          @sync="(status.password = $event)"
        />
      </v-window-item>
      <v-window-item :value="2">
        <CaptchaCard :password="status.password" @back="status.step--" />
      </v-window-item>
    </v-window>
  </v-dialog>
</template>
<script>
import useEditProfile from "@/composables/users/profile/useEditProfile";
import EditProfileCard from "@/components/users/profile/EditProfileCard";
import EditPasswordCard from "@/components/users/profile/EditPasswordCard";
import CaptchaCard from "@/components/users/profile/CaptchaCard";

export default {
  setup() {
    const { statics, status } = useEditProfile();
    return { statics, status };
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    EditProfileCard,
    EditPasswordCard,
    CaptchaCard,
  },
};
</script>
