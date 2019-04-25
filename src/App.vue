<template>
  <v-app :dark="darkMode">
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
      <v-switch
        v-model="darkMode"
        hide-details
        :label="dmswitch"
      />
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import { mutations } from './store/types';

export default {
  name: 'App',
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(['darkMode']),
    dmswitch() {
      return this.darkMode ? 'Dark' : 'Light';
    },
    darkMode: {
      get() {
        return this.$store.state.darkMode;
      },
      set(value) {
        this.$store.commit(mutations.UPDATE_DARK_MODE, value);
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
