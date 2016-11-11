import Vue from 'vue';
import App from './App';

require('../../animation/animation');
require('./style.scss');

function initialize() {
  new Vue({
    el: 'body',
    components: { App }
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
