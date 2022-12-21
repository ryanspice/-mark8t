Storage.prototype.setObject = function (key, value, expirationInMin) {
  this.setItem(key, Storage.prototype.encode(JSON.stringify(value)));

  if (expirationInMin) {
    const time = new Date().getTime() + 60000 * expirationInMin;
    this.setItem(key + "~ttl", time);
  }
};
