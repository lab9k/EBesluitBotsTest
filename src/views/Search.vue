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
          <v-list three-line>
            <v-list-tile
              v-for="(item, i) in docsOnConfidence"
              :key="i"
              class="list-tile-item"
            >
              <v-list-tile-avatar>
                <img :src="item.avatar">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-text="item.title" />
                <v-list-tile-sub-title v-text="`${ item.content.substring(0,150) }`" />
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon @click="downloadItem(item)">
                  cloud_download
                </v-icon>
                <v-icon @click="vote(true,item)">
                  thumb_up
                </v-icon>
                <v-icon @click="add_feedback(false,item)">
                  thumb_down
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
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
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { actions } from '../store/types';

export default {
  data() {
    return {
      valid: false,
      question: 'Waar kan ik mijn woonwagen parkeren?',
      questionRules: [q => !!q || 'Question in required'],
      items: [{ title: 'Hello World', icon: true }],
      dialog: false,
      currentItem: {},
      feedbackText: '',
    };
  },
  computed: {
    ...mapGetters(['docsOnConfidence']),
    // nalantisIconUrl() {
    //   // eslint-disable-next-line global-require
    //   return require('../assets/Citybot_Icon.jpg');
    // },
  },
  methods: {
    submit(e) {
      e.preventDefault();
      if (this.valid) {
        this.$store.dispatch(actions.ASK_QUESTION, this.question);
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
  background-color: whitesmoke;
}
.theme--light.v-list {
  background-color: #fafafa;
}
.v-list--three-line .v-list__tile {
  height: 120px;
}
</style>
