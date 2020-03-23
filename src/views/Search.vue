<template>
  <div class="search">
    <v-form
      v-model="valid"
      @submit="submit"
    >
      <v-container>
        <v-layout>
          <v-flex
            xs12
            md12
          >
            <v-text-field
              v-model="question"
              :rules="questionRules"
              label="Question"
              required
              box
            />
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
    <v-layout v-if="!displaySearchTogether">
      <v-flex xs6>
        <v-container>
          <h3 class="headline text-xs-center">
            Nalantis
          </h3>
          <search-expansion-panel provider="nalantis" />
        </v-container>
      </v-flex>
      <v-flex xs6>
        <v-container>
          <h3 class="headline text-xs-center">
            Alexandria.Works
          </h3>
          <search-expansion-panel provider="alexandria.works" />
        </v-container>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-flex xs12>
        <v-container>
          <h3 class="headline text-xs-center">
            Nalantis
            <!-- Nalantis & Alexandria.Works -->
          </h3>
          <search-expansion-panel provider="nalantis|alexandria.works" />
        </v-container>
      </v-flex>
    </v-layout>
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="350"
      dark
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          {{ errorMessage }}
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
            :active="progressing"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { actions } from '../store/types';
import SearchExpansionPanel from '../components/SearchExpansionPanel.vue';

export default {
  name: 'Search',
  components: { SearchExpansionPanel },
  data() {
    return {
      valid: false,
      question: 'Waar kan ik mijn woonwagen parkeren?',
      questionRules: [q => !!q || 'Gelieve een vraag in te vullen.'],
      loading: false,
      errorMessage: 'Even geduld, de documenten worden opgehaald.',
      progressing: true,
    };
  },
  computed: {
    ...mapGetters(['docsOnConfidence', 'displaySearchTogether']),
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if (this.valid) {
        this.loading = true;
        this.progressing = true;
        this.errorMessage = 'Even geduld, de documenten worden opgehaald.';
        this.$store.dispatch(actions.ASK_QUESTION, this.question).then(() => {
          this.loading = false;
          if (this.docsOnConfidence.length === 0) {
            this.loading = true;
            this.progressing = false;
            this.errorMessage = 'No documents found';
          }
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.list-tile-item {
  margin-top: 1em;
  margin-bottom: 1em;
  border-bottom: 2px solid rgba($color: #333, $alpha: 0.5);
}
.v-list--three-line .v-list__tile {
  height: 120px;
}
</style>
<style lang="scss">
.v-expansion-panel__container {
  border-bottom: 1px solid black;
}
.v-expansion-panel__container--active {
  border-bottom: 2px solid black;
}
</style>
