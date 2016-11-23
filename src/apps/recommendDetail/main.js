import Vue from 'vue';
import $ from 'jquery';
import config from '../../config';
import messageTip from '../../common/messageTip';
import redirectUrl from '../../utils/redirectUrl';
import DialogGuide from '../../components/DialogGuide';

require('./style.scss');
require('./delate');

new Vue({
  el: 'body',
  data() {
    return {
      replyId: window.jsConfig.replyId,
      show: false,
      guideTip: '是否删除该详情',
      guideConfirmText: '确定',
      guideCancelText: '取消'
    };
  },
  components: {
    DialogGuide
  },
  events: {
    onConfirm() {
      this.delete();
    }
  },
  methods: {
    onDeleteClick() {
      this.show = true;
    },
    delete() {
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
        } else {
          messageTip.show('请先登录~', 'login');
        }
      });
    }
  }
});
