<template>
  <v-app>
    <Header :snackbar.sync="snackbar" />
    <v-main>
      <router-view />
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
        <template #action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import useSnackbar from "@/composables/global/useSnackbar"
import Header from "@/components/global/Header.vue"

export default {
  components: {
    Header
  },
  setup() {
    const { snackbar } = useSnackbar()
    return { snackbar }
  },
  created() {
    try {
      this.$vuetify.theme.dark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.body.removeChild(document.getElementById("app-loader"))
    } catch {
      console.log("Have a nice day!")
    }
  }
}
</script>
