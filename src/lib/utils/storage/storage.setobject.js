import { browser, dev } from "$app/environment";
import { encode } from "./storage.encode.js";

const setObject = function (key, value, expirationInMin) {
  let keyName = key;
  let keyExpiration = expirationInMin;
  if (dev) {
    keyName = "" + key;
    keyExpiration = 0;
  }
  this.setItem(keyName, encode(JSON.stringify(value)));

  if (keyExpiration) {
    const time = Number(new Date().getTime()) + 60000 * Number(keyExpiration);
    this.setItem(key + "~ttl", Number(time));
  }
};
if (browser) { Storage.prototype.setObject = setObject; }
export default setObject;