import Vue from 'vue';
import App from './App';

require('../../animation/animation');
require('./style.scss');

new Vue({
  el: 'body',
  components: {
    App
  }
});
