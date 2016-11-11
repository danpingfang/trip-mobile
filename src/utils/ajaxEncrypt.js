import $ from 'jquery';
import getDeviceId from './getDeviceId';

function ajaxEncrypt() {
  $.extend($.ajaxSettings, {
    beforeSend(xhr) {
      const deviceId = getDeviceId();
      xhr.setRequestHeader('deviceId', deviceId);
    }
  });
}
export default ajaxEncrypt;
