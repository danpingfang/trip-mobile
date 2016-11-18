import Vue from 'vue';

require('./style.scss');

new Vue({
  el: 'body',
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    handleTabContent(index) {
      this.currentIndex = index;
    }
  }
});
