function escapeRegExp(value) {
  return String(value).replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
}

class Cookie {
  constructor(key, options) {
    this.options = Object.assign({}, {
      path: '/',
      domain: false,
      duration: false,
      secure: false,
      doc: document,
      encode: true,
      httpOnly: false
    }, options);
    this.key = key;
  }

  write(value) {
    if (this.options.encode) {
      value = encodeURIComponent(value);
    }
    if (this.options.domain) {
      value += `; domain=${this.options.domain}`;
    }
    if (this.options.path) {
      value += `; path=${this.options.path}`;
    }
    if (this.options.duration) {
      const date = new Date();
      date.setTime(date.getTime() +
        this.options.duration * 24 * 60 * 60 * 1000);
      value += `; expires=${date.toGMTString()}`;
    }
    if (this.options.secure) {
      value += '; secure';
    }
    if (this.options.httpOnly) {
      value += '; HttpOnly';
    }
    this.options.doc.cookie = `${this.key}=${value}`;
    return this;
  }

  read() {
    const re = `(?:^|;)\\s*${escapeRegExp(this.key)}=([^;]*)`;
    const value = this.options.doc.cookie.match(re);
    return (value) ? decodeURIComponent(value[1]) : null;
  }

  dispose() {
    new Cookie(this.key, Object.assign({}, this.options, { duration: -1 }))
      .write('');
    return this;
  }
}

export default {
  write: (key, value, options) => {
    return new Cookie(key, options).write(value);
  },

  read: key => {
    return new Cookie(key).read();
  },

  dispose: (key, options) => {
    return new Cookie(key, options).dispose();
  }
};
