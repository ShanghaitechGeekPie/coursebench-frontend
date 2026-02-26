<template>
  <div class="d-flex justify-center align-center" style="min-height: 50vh">
    <div class="text-center">
      <v-progress-circular indeterminate color="primary" size="56"></v-progress-circular>
      <div class="pt-4">正在完成登录...</div>
    </div>
  </div>
</template>

<script>
import { inject } from 'vue';
import axios from 'axios';
import Config from 'Config';
import { getPreset, setPreset } from '@/composables/global/useCookie';

export default {
  setup() {
    const global = inject('global');
    return { global };
  },
  async created() {
    try {
      const myIDResponse = await axios.get(`${Config.serverUrl}/user/my_id`, {
        withCredentials: true,
      });
      const userID = myIDResponse?.data?.data?.id || 0;
      if (!userID) {
        throw new Error('not logged in');
      }

      const profileResponse = await axios.get(
        `${Config.serverUrl}/user/profile/${userID}`,
        { withCredentials: true },
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

      // Update global state - this is critical for login status!
      this.global.isLogin = true;
      this.global.userProfile = getPreset();

      // Debug: verify preset is set correctly
      console.log('[DEBUG] OAuth callback - preset saved:', getPreset());
      console.log('[DEBUG] OAuth callback - global.isLogin:', this.global.isLogin);

      // Small delay to ensure cookie is written before redirect
      await new Promise(resolve => setTimeout(resolve, 100));

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
