import Vue from 'vue';
import touchBrokenFix from '../../../common/touchBrokenFix';

require('../../../animation/animation');
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
    ready() {
      touchBrokenFix();
    },
    handleTabContent(index) {
      this.show = true;
      this.currentIndex = index;
    }
  }
});
