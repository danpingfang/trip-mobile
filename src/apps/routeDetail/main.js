import Vue from 'vue';

require('../../animation/animation');
require('./style.scss');

new Vue({
  el: 'body',
  data() {
    return {
      show: false,
      currentIndex: 0
    };
  },
  methods: {
    handleTabContent(index) {
      this.show = true;
      this.currentIndex = index;
    }
  }
});
