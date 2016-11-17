import Vue from 'vue';
import $ from 'jquery';
import config from '../../config';
import messageTip from '../../common/messageTip';
import redirectUrl from '../../utils/redirectUrl';

require('./style.scss');
require('./delate');

new Vue({
  el: 'body',
  data() {
    return {
      replyId: window.jsConfig.replyId
    };
  },
  methods: {
    onDelete() {
      $.ajax({
        url: `${config.authApiUrl}/reply/detail`,
        type: 'post',
        dataType: 'json',
        data: Object.assign({}, config.mock, {
          replyId: this.replyId
        })
      }).done((response) => {
        if (response.code === 0) {
          messageTip.show('已删除～', () => {
            redirectUrl();
          });
        }
      });
    }
  }
});
