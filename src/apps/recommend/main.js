import Vue from 'vue';
import VueInfiniteScroll from 'vue-infinite-scroll';
import App from './App';

Vue.use(VueInfiniteScroll);

require('../../animation/animation');
require('./style.scss');

new Vue({
  el: 'body',
  components: { App }
});
