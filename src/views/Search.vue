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
                <img :src="'https://avatars3.githubusercontent.com/u/10141933?size=64'">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-text="item.title" />
                <v-list-tile-sub-title v-text="item.confidence || item.scoreInPercent" />
              </v-list-tile-content>
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
      question: '',
      questionRules: [q => !!q || 'Question in required'],
      items: [{ title: 'Hello World', icon: true }],
    };
  },
  computed: {
    ...mapGetters(['docsOnConfidence']),
  },
  methods: {
    submit(e) {
      e.preventDefault();
      console.log(this.question);
      if (this.valid) {
        this.$store.dispatch(actions.ASK_QUESTION, this.question);
      }
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
</style>
