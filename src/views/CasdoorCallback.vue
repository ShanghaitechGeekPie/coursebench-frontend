<template>
  <div class="d-flex justify-center align-center" style="min-height: 50vh">
    <div class="text-center">
      <v-progress-circular indeterminate color="primary" size="56"></v-progress-circular>
      <div class="pt-4">正在完成登录...</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Config from 'Config';
import { getPreset, setPreset } from '@/composables/global/useCookie';

export default {
  async created() {
    try {
      const myIDResponse = await axios.get(`${Config.serverUrl}/user/my_id`);
      const userID = myIDResponse?.data?.data?.id || 0;
      if (!userID) {
        throw new Error('not logged in');
      }

      const profileResponse = await axios.get(
        `${Config.serverUrl}/user/profile/${userID}`,
      );
      const profile = profileResponse?.data?.data;
      setPreset({
        id: profile.id,
        email: profile.email,
        nickname: profile.nickname,
        avatar: profile.avatar,
        is_anonymous:
          profile.is_anonymous == undefined ? false : profile.is_anonymous,
        year: profile.year,
        grade: profile.grade,
        realname: profile.realname,
        is_admin: profile.is_admin,
        is_community_admin: profile.is_community_admin,
      });

      const returnURL = this.$route.query.return_url || '/';
      if (returnURL.startsWith('http://') || returnURL.startsWith('https://')) {
        const parsed = new URL(returnURL);
        if (parsed.origin === window.location.origin) {
          window.location.replace(returnURL);
          return;
        }
      }
      if (returnURL.startsWith('/')) {
        window.location.replace(returnURL);
      } else {
        window.location.replace('/');
      }
    } catch {
      const preset = getPreset();
      if (preset.id) {
        window.location.replace('/');
      } else {
        this.$router.replace('/');
      }
    }
  },
};
</script>
