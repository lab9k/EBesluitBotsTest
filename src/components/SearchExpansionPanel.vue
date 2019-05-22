<template>
  <div>
    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="item in documents"
        :key="item.lId"
      >
        <template v-slot:header>
          <v-layout
            align-center
            row
            spacer
          >
            <v-flex
              xs4
              class="text-xs-center"
            >
              <strong>{{ item.title }}</strong>
            </v-flex>
            <!-- eslint-disable vue/no-v-html -->
            <v-flex
              v-if="!darkMode"
              xs8
              class="grey--text text--darken-4"
              v-html="item.content.substring(0,200)"
            />
            <v-flex
              v-else
              xs8
              class="grey--text text--lighten-4"
              v-html="item.content.substring(0,200)"
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
              class="py-2"
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
            <v-divider />
            <v-layout
              align-center
              row
              class="pt-3"
            >
              <v-flex xs2>
                <strong>Concepts:</strong>
              </v-flex>

              <v-flex
                xs10
                justify-center
              >
                {{ item.category }}
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-list-tile class="grow">
              <v-layout
                align-center
                justify-end
              >
                <v-icon
                  class="mr-1"
                  @click="downloadItem(item)"
                >
                  cloud_download
                </v-icon>
                <span class="subheading mr-4">Download</span>
                <v-icon
                  :color="item.voted === 'blue' ? item.voted : undefined"
                  class="mr-2"
                  @click="vote(true,item)"
                >
                  thumb_up
                </v-icon>
                <v-icon
                  :color="item.voted === 'red' ? item.voted : undefined"
                  @click="add_feedback(false,item)"
                >
                  thumb_down
                </v-icon>
              </v-layout>
            </v-list-tile>
          </v-card-actions>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="headline">Feedback</span>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { actions } from '../store/types';

export default {
  name: 'SearchExpansionPanel',
  props: {
    provider: {
      type: String,
      required: true,
      validator(value) {
        return ['nalantis', 'alexandria.works', 'nalantis|alexandria.works'].indexOf(value) > -1;
      },
    },
  },
  data() {
    return {
      feedbackText: '',
      dialog: false,
      currentItem: {},
    };
  },
  computed: {
    ...mapGetters(['docsOnConfidence', 'darkMode']),
    documents() {
      if (this.provider.indexOf('|') > -1) {
        return this.docsOnConfidence;
      }
      return this.docsOnConfidence.filter(doc => doc.from === this.provider);
    },
  },
  methods: {
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
</style>
