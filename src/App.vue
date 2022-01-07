<template>
  <v-app>
    <v-app-bar app>
      <v-btn text>123</v-btn>
      <v-btn text>123</v-btn>
      <v-btn text>123</v-btn>
      <v-spacer></v-spacer>
      <v-menu bottom rounded offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar color="pink">
              <span class="white--text">123</span>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-btn text>Login</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn text>Logout</v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn text>Feedback</v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
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
