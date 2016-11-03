import getDeviceId from './utils/getDeviceId';
const domainUrl = 'http://m.oversealive.com';
const staticUrl = '//s.oversealive.com';
const apiUrl = 'http://cis.oversealive.com';

export default {
  mock: {},
  domainUrl,
  staticUrl,
  apiUrl: `${apiUrl}/cis/open/api/v1`,
  authApiUrl: `${apiUrl}/cis/inner/api/v1`,
  authUrl: `${domainUrl}/cis/inner/web/redirect/weixin_redirect?` +
  `redirectUrl=${location.href}&deviceId=${getDeviceId()}`,
  whiteListUrls: [
    /^http:\/\/localhost/,
    /^http:\/\/m-test.oversealive.com/,
    /^http:\/\/m.oversealive.com/
  ]
};
