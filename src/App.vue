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
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/global/Header"
import useSnackbar from "@/composables/global/useSnackbar"

export default {
  name: "App",
  components: { Header },
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
