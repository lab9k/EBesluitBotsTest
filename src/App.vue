<template>
  <v-app :dark="darkMode">
    <v-toolbar
      app
      style="background-color:#007DB3;"
    >
      <v-toolbar-title class="headline text-uppercase">
        <span class="white--text">CITYBOT</span>
        <!-- <span class="font-weight-light">NLP-CHATBOTS</span> -->
      </v-toolbar-title>
      <v-spacer />
      <v-btn
        flat
        to="/"
      >
        <span class="mr-2 white--text">Chatbot</span>
      </v-btn>
      <v-btn
        flat
        to="/search"
      >
        <span class="mr-2 white--text">Zoeken</span>
      </v-btn>
      <v-switch
        v-model="darkMode"
        hide-details
        :label="dmswitch"
        class="mx-3 white--text"
        dark
      />
      <!-- <v-switch
        v-if="$route.name ==='search'"
        v-model="displayTogether"
        hide-details
        :label="togetherSwitch"
      /> -->
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
// import { mapState } from 'vuex';
import { mutations } from './store/types';

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  computed: {
    // ...mapState(['darkMode']),
    dmswitch() {
      return this.darkMode ? 'Donker' : 'Licht';
    },
    togetherSwitch() {
      return this.displayTogether ? 'Samen' : 'Apart';
    },
    darkMode: {
      get() {
        return this.$store.state.darkMode;
      },
      set(value) {
        this.$store.commit(mutations.UPDATE_DARK_MODE, value);
      },
    },
    displayTogether: {
      get() {
        return this.$store.state.displaySearchTogether;
      },
      set(value) {
        this.$store.commit(mutations.UPDATE_DISPLAY_TOGETHER, value);
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.v-input--switch {
  flex: unset;
}
</style>
