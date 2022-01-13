<template>
  <v-app>
    <Header :snackbar.sync="snackbar" />
    <v-main>
      <router-view />
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:action="{ attrs }">
          <v-btn text v-bind="attrs" @click="snackbar.show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
import { provide, reactive } from "@vue/composition-api"
import Header from "@/components/global/Header.vue"

export default {
  components: {
    Header
  },
  created() {
    try {
      this.$vuetify.theme.dark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.body.removeChild(document.getElementById("app-loader"))
    } catch {
      console.log("Have a nice day!")
    }
  },
  setup() {
    const snackbar = reactive({show: false, text: null, color: null})
    provide("showSnackbar", (color, text) => {
      snackbar.show = true
      snackbar.text = text
      snackbar.color = color
    })
    return { snackbar }
  }
}
</script>
