import { dev } from "$app/environment";

Storage.prototype.setObject = function (key, value, expirationInMin) {
  let keyName = key;
  let keyExpiration = expirationInMin;
  if (dev) {
    keyName = "" + key;
    keyExpiration = 0;
  }
  this.setItem(keyName, Storage.prototype.encode(JSON.stringify(value)));

  if (keyExpiration) {
    const time = Number(new Date().getTime()) + 60000 * Number(keyExpiration);
    this.setItem(key + "~ttl", Number(time));
  }
};