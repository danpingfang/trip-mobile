import config from '../config';
import redirectUrl from '../utils/redirectUrl';
import toast from 'vue-toast-mobile';

const messageTip = {
  show(message, type) {
    let fn = () => {};
    toast({
      message,
      position: 'middle',
      duration: 7500,
      className: 'toast-wrap'
    });
    if (type === 'login') {
      fn = () => {
        redirectUrl(`${config.authUrl}`);
      };
    } else if (typeof type === 'function') {
      fn = type;
    }
    setTimeout(fn, 750);
  }
};

export default messageTip;
