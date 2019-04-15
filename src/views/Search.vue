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
                <img
                  :src="item.from === 'nalantis'?
                    nalantisIconUrl:
                    'https://picsum.photos/64'"
                >
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-text="item.title" />
                <v-list-tile-sub-title
                  v-text="`confidence: ${ item.scoreInPercent
                    || item.confidence*100}`"
                />
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon @click="downloadItem(item)">
                  cloud_download
                </v-icon>
                <v-icon @click="vote(true,item)">
                  thumb_up
                </v-icon>
                <v-icon @click="vote(false,item)">
                  thumb_down
                </v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-container>
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
    };
  },
  computed: {
    ...mapGetters(['docsOnConfidence']),
    nalantisIconUrl() {
      // eslint-disable-next-line global-require
      return require('../assets/Citybot_Icon.jpg');
    },
  },
  methods: {
    submit(e) {
      e.preventDefault();
      console.log(this.question);
      if (this.valid) {
        this.$store.dispatch(actions.ASK_QUESTION, this.question);
      }
    },
    downloadItem(item) {
      console.log(item);
      if (item.resourceURI) {
        this.$store.dispatch(actions.DOWNLOAD_FILE, {
          path: item.resourceURI,
          provider: 'nalantis',
        });
      } else {
        this.$store.dispatch(actions.DOWNLOAD_FILE, {
          path: `https://digipolis-poc.alexandria.works/v0.1/documents/${item.uuid}`,
          provider: 'alexandria.works',
        });
      }
    },
    vote(state, item) {
      this.$store.dispatch(actions.VOTE, { state, item, question: this.question });
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
