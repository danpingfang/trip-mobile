<template>
  <base-dialog :show="show" :config="dialogConfig">
    <div class="image-code" slot="body">
      <div class="image-code-field">
        <input class="form-input {{ isError ? ' form-input-error' : '' }}" autocomplete="false"
               type="tel" minlength="4" maxlength="4" value=""
               v-model="imageCode" @input="onInput" @blur="isValid">
      </div>
      <div class="image-code-tip">输入下图中的字符，不区分大小写</div>
      <img :src="imageUrl" alt="验证码" autocomplete="false">
      <button type="button" @click="refresh">看不清，换一张</button>
    </div>
  </base-dialog>
</template>

<script>
  import config from '../../../config';
  import $ from 'jquery';
  import messageTip from '../../../common/messageTip';
  import BaseDialog from './BaseDialog';

  export default {
    props: ['show'],
    data() {
      return {
        dialogConfig: {
          dialogClassName: 'image-code-dialog',
          confirmText: '确定'
        },
        tipText: null,
        showImageTip: false,
        isError: false,
        imageCode: null,
        imageUrl: null
      };
    },
    components: {
      BaseDialog
    },
    events: {
      onConfirm() {
        if (this.isValid()) {
          this.$dispatch('onImageCodeDialogCallback',
            this.imageCode, (errorMessage) => {
              messageTip.show(errorMessage);
              this.isError = true;
            });
        }
      },
      onClose() {
        this.$dispatch('onCancel');
      }
    },
    watch: {
      show(isShow) {
        if (isShow) {
          this.getImageCode();
        }
      }
    },
    methods: {
      isValid() {
        if (this.imageCode === '' || this.imageCode.length !== 4) {
          this.isError = true;
          return false;
        }
        this.isError = false;
        return true;
      },
      onInput() {
        this.isValid();
      },
      getImageCode() {
        $.ajax({
          url: `${config.apiUrl}/account/get_image_code`,
          dataType: 'json',
          xhrFields: {
            withCredentials: true
          }
        }).done((response) => {
          this.imageUrl = response.data;
        });
      },
      refresh() {
        this.getImageCode();
      }
    }
  };
</script>
