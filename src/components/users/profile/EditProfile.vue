<template>
  <div>
    <v-btn
      outlined
      color="primary"
      width="100"
      @click="status.editProfile = true"
    >
      <v-icon size="20">
        {{ statics.icons.mdiAccountEditOutline }}
      </v-icon>
      <span>个人设置</span>
    </v-btn>
    <v-dialog v-model="status.editProfile" max-width="600">
      <v-window v-model="status.step">
        <v-window-item :value="0">
          <EditProfileCard @editPassword="status.step++" />
        </v-window-item>
        <v-window-item :value="1">
          <EditPasswordCard
            @next="status.step++"
            @back="status.step--"
            @sync="status.password = $event"
          />
        </v-window-item>
        <v-window-item :value="2">
          <CaptchaCard :password="status.password" @back="status.step--" />
        </v-window-item>
      </v-window>
    </v-dialog>
  </div>
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
  components: {
    EditProfileCard,
    EditPasswordCard,
    CaptchaCard,
  },
};
</script>
