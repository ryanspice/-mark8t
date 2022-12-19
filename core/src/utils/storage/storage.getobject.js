Storage.prototype.getObject = function (key, callback) {
  try {
    const value = this.getItem(key);
    const ttl = this.getItem(key + "~ttl");

    if (ttl) {
      if (ttl < new Date().getTime()) {
        this.removeItem(key);
        this.removeItem(key + "~ttl");
        callback();
        return false;
      }
    } else {
      callback();
    }

    return value && JSON.parse(Storage.prototype.decode(value));
  } catch (e) {
    new Error(e);
    return key;
  }
};
