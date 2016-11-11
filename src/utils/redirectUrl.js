import config from '../config';

export default (url) => {
  const isUrl = typeof url === 'string';
  const redirectUrl = decodeURIComponent(
    isUrl ? url : location.search.substring(13).split('&')[0]);
  const whiteListUrls = config.whiteListUrls;
  for (let i = 0, l = whiteListUrls.length; i < l; i++) {
    if (whiteListUrls[i].test(redirectUrl)) {
      if (isUrl) {
        location.href = redirectUrl;
      } else {
        location.replace(redirectUrl);
      }
      break;
    }
  }
  console.log('The redirectUrl is not in white list urls.');
  return false;
};
