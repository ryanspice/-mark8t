import { browser, dev } from "$app/environment";

import { get } from 'svelte/store';
import { encode } from "./storage.encode.js";


const setObject = function (key, value, expirationInMin) {

  if (!browser)
  return false;

  let keyName = key;
  let keyExpiration = expirationInMin;
  if (dev) {
    keyName = "" + key;
    keyExpiration = 0;
  }
  localStorage.setItem(keyName, encode(JSON.stringify(value)));

  if (keyExpiration) {
    const time = Number(new Date().getTime()) + 60000 * Number(keyExpiration);
    localStorage.setItem(key + "~ttl", Number(time));
  }
};
const storage = browser ? window.localStorage : null;
if (storage) { storage.setObject = setObject; }
export {setObject};
export default setObject;