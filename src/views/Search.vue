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
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content
              v-for="item in docsOnConfidence"
              :key="item.lId"
              hide-actions
            >
              <template v-slot:header>
                <v-layout
                  align-center
                  row
                  spacer
                >
                  <v-flex xs1>
                    <v-avatar size="64px">
                      <img
                        :src="item.avatar"
                        :alt="`${item.from} avatar`"
                      >
                    </v-avatar>
                  </v-flex>
                  <v-flex
                    xs4
                    class="text-xs-center"
                  >
                    <strong>{{ item.title }}</strong>
                  </v-flex>
                  <!-- eslint-disable vue/no-v-html -->
                  <v-flex
                    xs7
                    class="grey--text"
                    v-html="item.content.substring(0,150)"
                  />
                  <!-- eslint-enable vue/no-v-html -->
                </v-layout>
              </template>
              <v-card light>
                <v-divider />
                <v-card-text>
                  <v-layout
                    align-center
                    row
                    class="mb-2"
                  >
                    <v-flex xs2>
                      <strong>From:</strong>
                    </v-flex>
                    <v-flex xs10>
                      {{ item.from }}
                    </v-flex>
                  </v-layout>
                  <v-divider />
                  <v-layout
                    align-center
                    row
                  >
                    <v-flex xs2>
                      <strong>Highlighting:</strong>
                    </v-flex>
                    <!-- eslint-disable vue/no-v-html -->
                    <v-flex
                      xs10
                      justify-center
                      v-html="item.highlight"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="feedbackText"
                  label="Feedback"
                  required
                />
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            flat
            @click="dialog = false;feedbackText = ''"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            flat
            @click="vote(false,currentItem)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="loading"
      hide-overlay
      persistent
      width="350"
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

export default {
  name: 'Search',
  data() {
    return {
      valid: false,
      question: 'Waar kan ik mijn woonwagen parkeren?',
      questionRules: [q => !!q || 'Gelieve een vraag in te vullen.'],
      dialog: false,
      currentItem: {},
      feedbackText: '',
      loading: false,
      errorMessage: 'Even geduld, de documenten worden opgehaald.',
      progressing: true,
    };
  },
  computed: {
    ...mapGetters(['docsOnConfidence']),
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
    downloadItem(item) {
      if (item.resourceURI) {
        this.$store.dispatch(actions.DOWNLOAD_FILE, {
          path: item.resourceURI,
          provider: 'nalantis',
          title: item.title,
        });
      } else {
        this.$store.dispatch(actions.DOWNLOAD_FILE, {
          path: `https://digipolis-poc.alexandria.works/v0.1/documents/${item.uuid}`,
          provider: 'alexandria.works',
        });
      }
    },
    vote(state, item) {
      this.$store.dispatch(actions.VOTE, {
        state,
        item,
        question: this.question,
        feedbackText: this.feedbackText,
      });
      this.dialog = false;
      this.feedbackText = '';
    },
    add_feedback(positive, item) {
      this.currentItem = item;
      this.dialog = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.list-tile-item {
  margin-top: 1em;
  margin-bottom: 1em;
  border-bottom: 1px solid rgba($color: #333, $alpha: 0.5);
}
.v-list--three-line .v-list__tile {
  height: 120px;
}
</style>
