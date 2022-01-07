<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/global/Header.vue";

export default {
  components: {
    Header
  },
  created() {
    try {
      this.$vuetify.theme.dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.body.removeChild(document.getElementById("app-loader"));
    } catch {
      console.log("Have a nice day!");
    }
  }
};
</script>
