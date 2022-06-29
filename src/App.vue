<style>
body {
  overflow-x: hidden;
}
</style>

<template>
  <v-app>
    <Header :snackbar.sync="snackbar" />
    <v-main>
      <router-view />
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="snackbar.timeout">
        {{ snackbar.text }}
        <template #action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
        </template>
      </v-snackbar>
      <VueQueryDevTools />
    </v-main>
  </v-app>
</template>

<script>
import { VueQueryDevTools } from "vue-query/devtools"
import useSnackbar from "@/composables/global/useSnackbar"
import Header from "@/components/global/Header"

export default {
  name: "App",
  components: { VueQueryDevTools, Header },
  setup() {
    const { snackbar } = useSnackbar()
    return { snackbar }
  },
  created() {
    try {
      document.body.removeChild(document.getElementById("app-loader"))
      this.$vuetify.theme.dark = window.matchMedia("(prefers-color-scheme: dark)").matches
    } catch {}
  }
}
</script>
