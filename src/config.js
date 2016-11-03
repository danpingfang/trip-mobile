import getDeviceId from './utils/getDeviceId';
const domainUrl = 'http://mb-test.lvbaoyou.com';
const staticUrl = '//s.lvbaoyou.com';
const apiUrl = 'http://tls-test.lvbaoyou.com';

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
    /^http:\/\/mb-test.lvbaoyou.com/,
    /^http:\/\/m.lvbaoyou.com/
  ]
};
