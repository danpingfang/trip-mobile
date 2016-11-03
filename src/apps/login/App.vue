<template>
  <validator name="loginform">
    <form class="form login-form" @submit="onSubmit">
      <h2 class="form-title">输入您的手机号</h2>
      <!--<p class="login-notice">登录后意味着您同意我们的<a href="">《用户协议》</a></p>-->
      <div
        class="form-field{{($loginform.mobile.touched || $loginform.mobile.modified) && $loginform.mobile.invalid ? ' form-field-error' : '' }}">
        <div class="form-select-container">
          <select class="form-select" v-model="areaCode">
            <option value="86" selected="selected">+86</option>
          </select>
        </div>
        <input class="form-input" type="tel" minlength="11" maxlength="11"
               name="mobile"
               v-model="account"
               placeholder="请输入手机号"
               v-validate:mobile="['mobileNumber']">
      </div>
      <div
        class="form-field{{($loginform.vertify.touched || $loginform.vertify.modified) && $loginform.vertify.invalid ? ' form-field-error' : '' }}">
        <input class="form-input" type="tel" value="" minlength="4"
               maxlength="4"
               v-validate:vertify="['messageCode']"
               placeholder="请输入验证码" v-model="messageCode" name="messageCode">
        <message-code :disable="$loginform.mobile.invalid"
                     :config="config"></message-code>
      </div>
      <div class="extra-field">
        <button type="submit"
                class="button button-primary button-full button-medium{{ $loginform.valid ? '' : ' button-disable' }}">
          确定
        </button>
      </div>
    </form>
  </validator>
</template>

<script>
  import $ from 'jquery';
  import getParameterByName from '../../utils/getParameterByName';
  import redirectUrl from '../../utils/redirectUrl';
  import toast from 'vue-toast-mobile';
  import config from '../../config';
  import MessageCode from './components/MessageCode';

  export default {
    data() {
      return {
        areaCode: null,
        account: null,
        messageCode: null,
        imageCode: null,
        error: false,
        errorTip: null,
        isValid: false,
        weixinCode: getParameterByName('weixinCode')
      };
    },
    components: {
      MessageCode
    },
    events: {
      setImageCode(imageCode) {
        this.imageCode = imageCode;
      },
      getMessageCodeParams(cb) {
        const self = this;
        cb({
          account: self.account
        });
      },
      onCheckFiledValue(fn) {
        if (this.$loginform.mobile.valid) {
          fn();
        }
      }
    },
    validators: {
      mobileNumber(val) {
        return /^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/
          .test(val);
      },
      messageCode(val) {
        return val !== '' && val.length === 4;
      }
    },

    methods: {
      onSubmit(event) {
        event.preventDefault();
        if (this.$loginform.valid) {
          $.ajax({
            url: `${config.apiUrl}/account/login`,
            data: {
              account: this.account,
              verifyCode: this.messageCode,
              imageCode: this.imageCode,
              weixinCode: this.weixinCode
            },
            dataType: 'json',
            success(response) {
              if (response.code === 0) {
                redirectUrl(true);
              } else {
                toast({
                  message: response.message,
                  position: 'middle',
                  duration: 5000,
                  className: 'toast-wrap'
                });
              }
            }
          });
        }
      }
    }
  };
</script>
