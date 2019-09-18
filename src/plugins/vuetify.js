import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    accent: '#E2E2E2',
    error: '#F39200',
    info: '#c2e2f0',
    primary: '#ECF5F7',
    secondary: '#007DB3',
    warning: '#F39200',
  },
});
