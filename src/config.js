import getDeviceId from './utils/getDeviceId';
const domainUrl = 'http://m.oversealive.com';
const staticUrl = '//s.oversealive.com';
const apiUrl = 'http://115.159.71.249:4060';

export default {
  mock: {},
  domainUrl,
  staticUrl,
  apiUrl: `${apiUrl}/tls/open/api/v1`,
  authApiUrl: `${apiUrl}/tls/inner/api/v1`,
  authUrl: `${domainUrl}/tls/inner/web/redirect/weixin_redirect?` +
  `redirectUrl=${location.href}&deviceId=${getDeviceId()}`,
  whiteListUrls: [
    /^http:\/\/localhost/,
    /^http:\/\/m-test.oversealive.com/,
    /^http:\/\/m.oversealive.com/
  ]
};
