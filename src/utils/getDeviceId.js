import uuid from './uuid';
import platform from './platform';
import getParameterByName from './getParameterByName';

function getDeviceId() {
  let deviceId = localStorage.getItem('deviceId');
  if (!deviceId) {
    if (platform.isOverseaApp) {
      deviceId = getParameterByName('deviceId');
    } else {
      deviceId = uuid();
    }
    localStorage.setItem('deviceId', deviceId);
  }
  return deviceId;
}

export default getDeviceId;
