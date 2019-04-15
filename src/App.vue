<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Digipolis</span>
        <span class="font-weight-light">NLP-CHATBOTS</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        flat
        to="/"
      >
        <span class="mr-2">Bots</span>
      </v-btn>
      <v-btn
        flat
        to="/search"
      >
        <span class="mr-2">Search</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      //
    };
  },
};
</script>
