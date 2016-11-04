<template>
  <button type="button" @touchend="handleMessageCode"
          class="button-message-code{{ disable ? ' button-disable' : '' }}">{{ text | getText }}</button>
  <image-code-dialog
    :show="showImageCodeDialog"></image-code-dialog>
</template>

<script>
  import $ from 'jquery';
  import ImageCodeDialog from './ImageCodeDialog';
  import config from '../../../config';

  const TIMER_COUNT = 60;
  export default {
    props: ['disable'],
    data() {
      return {
        timerStart: false,
        timerCount: TIMER_COUNT,
        showImageCodeDialog: false
      };
    },
    components: {
      ImageCodeDialog
    },
    events: {
      onImageCodeDialogCallback(imageCode, errorCallback) {
        this.sendMessageCode(imageCode, errorCallback);
      },
      onCancel() {
        this.showImageCodeDialog = false;
      }
    },
    filters: {
      getText() {
        return this.timerStart ? `${this.timerCount}秒后重发` : '发送验证码';
      }
    },
    methods: {
      startTimer() {
        if (this.timerStart || this.disable) {
          return;
        }
        let timer;
        let fn = () => {
          if (this.timerCount === 1) {
            this.timerCount = TIMER_COUNT;
            this.timerStart = false;
            fn = null;
            clearTimeout(timer);
          } else {
            this.timerCount -= 1;
          }
          timer = setTimeout(fn, 1000);
        };
        setTimeout(fn, 1000);
        this.timerStart = true;
      },
      handleMessageCode() {
        if (!this.disable && !this.timerStart) {
          this.needImageCode().then((response) => {
            if (response.data) {
              this.showImageCodeDialog = true;
            } else {
              this.sendMessageCode();
            }
          });
        }
      },
      needImageCode() {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: `${config.apiUrl}/account/check_need_image_code`,
            data: {
              action: 'verify_code_login'
            },
            dataType: 'json',
            xhrFields: {
              withCredentials: true
            }
          }).done((response) => {
            resolve(response);
          }).fail((response) => {
            reject(response);
          });
        });
      },
      sendMessageCode(imageCode, errorCallback) {
        this.startTimer();
        this.$dispatch('getMessageCodeParams', (params) => {
          let data = Object.assign({}, {
            action: 'verify_code_login'
          }, params);
          if (imageCode) {
            data = Object.assign(data, {
              imageCode
            });
          }
          $.ajax({
            url: `${config.apiUrl}/account/send_verify_code`,
            type: 'post',
            data,
            dataType: 'json',
            xhrFields: {
              withCredentials: true
            }
          }).done((response) => {
            if (response.code === 0) {
              this.showImageCodeDialog = false;
              this.$dispatch('setImageCode', imageCode);
            } else {
              if (errorCallback) {
                errorCallback(response.message);
              }
            }
          });
        });
      }
    }
  };
</script>
