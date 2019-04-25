<template>
  <v-app :dark="darkmodeSwitch">
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
        v-model="darkmodeSwitch"
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
export default {
  name: 'App',
  components: {},
  data() {
    return {
      darkmodeSwitch: false,
    };
  },
  computed: {
    dmswitch() {
      return this.darkmodeSwitch ? 'Dark' : 'Light';
    },
  },
};
</script>
<style lang="scss" scoped>
.v-input--switch {
  flex: unset;
}
</style>
