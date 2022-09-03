<template>
  <v-app>
    <Header :snackbar.sync="snackbar" />
    <v-main>
      <router-view />
      <v-snackbar
        v-model="snackbar.show"
        :color="snackbar.color"
        :timeout="snackbar.timeout"
        outlined
      >
        {{ snackbar.text }}
        <template #action="{ attrs }">
          <v-btn v-bind="attrs" @click="snackbar.show = false" icon>
            <v-icon :color="snackbar.color">
              {{ icons.mdiClose }}
            </v-icon>
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>
<script>
import Header from "@/components/global/Header";
import useSnackbar from "@/composables/global/useSnackbar";
import { getPreset } from "@/composables/global/useCookie";
import { provide, reactive } from "vue";
import { mdiClose } from "@mdi/js";

export default {
  name: "App",
  components: { Header },
  setup() {
    const { snackbar } = useSnackbar();
    const global = reactive({
      userProfile: getPreset(),
      isLogin: Object.getOwnPropertyNames(getPreset())
            .filter((key) => key !== "__ob__")
            .length !== 0
    });
    provide("global", global);
    return { snackbar };
  },
  data() {
    return {
      icons: {
        mdiClose,
      },
    };
  },
  created() {
    try {
      document.body.removeChild(document.getElementById("app-loader"));
      this.$vuetify.theme.dark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    } catch {}
  },
};
</script>
<style>
body {
  overflow-x: hidden;
}
</style>