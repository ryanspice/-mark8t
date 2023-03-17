import { browser, dev } from "$app/environment";
import { decode } from "./storage.encode.js";

/** 
 * This version of the code defines the getObject function as a separate function and assigns it to the Storage.prototype.getObject property. 
 * This allows the function to be called on any Storage object (e.g. localStorage.getObject(key, callback)). 
 * The dev variable is imported from the "$app/environment" module, and is used to determine whether the key name should be modified. 
 * The callback function is called when the time-to-live (TTL) of the stored object has expired. 
 * The getObject function returns the stored object if it exists, or false if the object has expired. 
 * If an error occurs, the function returns the original key value. 
 * */
const getObject = function (key, callback) {

  if (!browser)
    return false;

  let keyName = key;

  // if (dev) {
  //   keyName = "" + key;
  // }

  try {
    const value = this.getItem(keyName);
    const ttl = this.getItem(keyName + "~ttl");

    if (ttl) {
      if (ttl < new Date().getTime()) {
        this.removeItem(keyName);
        this.removeItem(keyName + "~ttl");
        if (callback) callback();
        return false;
      }
    } else {
      if (callback) callback();
    }

    return JSON.parse(decode(value));
  } catch (e) {
    new Error(e);
    return key;
  }
};
if (browser) { Storage.prototype.getObject = getObject; }
export default getObject;