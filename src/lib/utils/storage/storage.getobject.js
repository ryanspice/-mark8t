import { dev } from "$app/environment";

Storage.prototype.getObject = function (key, callback) {

  let keyName = key;

  if (dev) {
    keyName = "" + key;
  }

  try {
    const value = this.getItem(keyName);
    const ttl = this.getItem(keyName + "~ttl");

    if (ttl) {
      if (ttl < new Date().getTime()) {
        this.removeItem(keyName);
        this.removeItem(keyName + "~ttl");
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
