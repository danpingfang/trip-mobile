import Vue from 'vue';
import RouteList from './RouteList';
import VueInfiniteScroll from 'vue-infinite-scroll';

Vue.use(VueInfiniteScroll);
require('./style.scss');

new Vue({
  el: 'body',
  components: {
    RouteList
  }
});
