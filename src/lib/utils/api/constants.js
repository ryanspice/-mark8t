/* URLS 
	dev/
		api/
		storage/
		storage/{tenant}/
		https://{_API}.ca/{_API_URL}
		https://{_DOMAIN}.ca/{_BASE}{_STORAGE}{_API_TENANT_}/
*/

export const baseUrl = import.meta.env.VITE_BASE;
export const tenantId = import.meta.env.VITE_TENANT_ID;
export const mapsId = import.meta.env.VITE_API_G_MAPS_ID;
export const mapsUrl = 'https://maps.googleapis.com/maps/api/js?key=' + mapsId + '&libraries=places&callback=initMap';

//
export const _NAME = (import.meta.env.VITE_NAME);
export const _DOMAIN = (import.meta.env.VITE_DOMAIN);
export const _BASE = (import.meta.env.VITE_BASE);
export const _TENANT = (import.meta.env.VITE_TENANT).replaceAll("-", "_");

//
export const _API = (import.meta.env.VITE_API_DOMAIN) + _BASE + (import.meta.env.VITE_API_URL);
export const _STORAGE = (import.meta.env.VITE_API_DOMAIN) + _BASE + (import.meta.env.VITE_STORAGE_URL) + _TENANT;

//
export const _SECRETS = (() => {
	return _STORAGE + '/secrets.json?r=' + Math.random() * 99999;
})();
export const _AUTHENTICATED = (() => {
	// return _STORAGE + '/_authenticated.json?r=' + Math.random() * 99999;
	return _STORAGE + '/users.auth.json?r=' + Math.random() * 99999;
})();
export const _WEBSITE = _STORAGE + '/website.json?r=' + Math.random() * 999998;
export const _PRODUCTS = _STORAGE + '/products.json?r=' + Math.random() * 999997;
export const _GOOGLE = _STORAGE + '/google.json?r=' + Math.random() * 999996;

//
//https://mark8t.ca/storage/3988fc5a_af7d_4ffb_8ce4_06132bd037a2/latest.php
//
export const _LATEST = _STORAGE + '/latest.php?r=' + Math.random() * 999995;

//
export const _POST_TO_TENANT = _API + _BASE + "/posttobid.php?r=" + Math.random() * 999995;
export const _POST_IMAGE_TO_TENANT = _API + _BASE + "/postimagetobid.php?r=" + Math.random() * 999994;

//
export const CACHE_DELAY = 1000;