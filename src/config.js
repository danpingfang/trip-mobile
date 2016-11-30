import getDeviceId from './utils/getDeviceId';
const domainUrl = 'http://mb-test.lvbaoyou.com';
const staticUrl = '//s-test.lvbaoyou.com';
const apiUrl = 'http://localhost:4060';

export default {
  mock: {
    mockAccount: 15222918077,
    deviceld: 11
  },
  domainUrl,
  staticUrl,
  apiUrl: `${apiUrl}/tls/open/api/v1`,
  authApiUrl: `${apiUrl}/tls/inner/api/v1`,
  authUrl: `${domainUrl}/tls/inner/web/redirect/weixin_redirect?` +
  `redirectUrl=${location.href}&deviceId=${getDeviceId()}`,
  whiteListUrls: [
    /^http:\/\/localhost/,
    /^http:\/\/tls-test.lvbaoyou.com/,
    /^http:\/\/tls.lvbaoyou.com/
  ]
};
