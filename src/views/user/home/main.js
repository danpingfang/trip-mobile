import Vue from 'vue';
import App from './App';
import VueInfiniteScroll from 'vue-infinite-scroll';

Vue.use(VueInfiniteScroll);
require('../../../animation/animation');
require('./style.scss');

new Vue({
  el: 'body',
  components: {
    App
  }
});
