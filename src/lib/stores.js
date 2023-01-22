import { base } from '$app/paths';
import { writable } from 'svelte/store';

import "./stores.store.js";

import "./utils/storage/storage.encode.js";
import "./utils/storage/storage.getobject.js";
import "./utils/storage/storage.setobject.js";

export const isOpen = writable(0);
export const opening_hours = writable(0);
export const place = writable({
	"address": "",
	"vicinity": "string"
});

const baseUrl = import.meta.env.VITE_BASE;
const tenantId = import.meta.env.VITE_TENANT_ID;
const mapsId = import.meta.env.VITE_API_G_MAPS_ID;
const mapsUrl = 'https://maps.googleapis.com/maps/api/js?key=' + mapsId + '&libraries=places&callback=initMap';

export const _WEBSITE_QUOTE_ = writable('');
_WEBSITE_QUOTE_.set("");

export const _GOOGLE_MAP_API_URL_ = writable('');
_GOOGLE_MAP_API_URL_.set(mapsUrl);

const _NEWSLETTER_URL_ = writable("");
export const _CALENDAR_URL_ = writable("");
export const _CALENDAR_IFRAME_ = writable("");

/* URLS 
	dev/
		api/
		storage/
		storage/{tenant}/
		https://{_API}.ca/{_API_URL}
		https://{_DOMAIN}.ca/{_BASE}{_STORAGE}{_API_TENANT_}/
*/

const _NAME = (import.meta.env.VITE_NAME);
const _DOMAIN = (import.meta.env.VITE_DOMAIN);
const _BASE = (import.meta.env.VITE_BASE);
const _TENANT = (import.meta.env.VITE_TENANT).replaceAll("-", "_");

const _API = (import.meta.env.VITE_API_DOMAIN) + _BASE + (import.meta.env.VITE_API_URL);
const _STORAGE = (import.meta.env.VITE_API_DOMAIN) + _BASE + (import.meta.env.VITE_STORAGE_URL) + _TENANT;

const _SECRETS = (() => {
	return _STORAGE + '/_secrets.json?r=' + Math.random() * 99999;
})();
const _AUTHENTICATED = (() => {
	return _STORAGE + '/_authenticated.json?r=' + Math.random() * 99999;
})();
const _WEBSITE = _STORAGE + '/website.json?r=' + Math.random() * 999998;
const _PRODUCTS = _STORAGE + '/products.json?r=' + Math.random() * 999997;
const _GOOGLE = _STORAGE + '/google.json?r=' + Math.random() * 999996;


const _POST_TO_TENANT = _API + _BASE + "/posttobid.php?r=" + Math.random() * 999995;
const _POST_IMAGE_TO_TENANT = _API + _BASE + "/postimagetobid.php?r=" + Math.random() * 999994;


const CACHE_DELAY = 1000;


export const phone = writable("");
export const email = writable("");

export const _API_STORE_ACCOUNT_ = writable({});
export const _API_STORE_WEBSITE_ = writable({});
export const _API_STORE_PRODUCTS_ = writable([]);
export const _API_STORE_GOOGLE_ = writable({});

//
const getAccountDataFromLocalStorage = () => {
	// console.log('getAccountDataFromLocalStorage', JSON.parse(localStorage.getItem('accounts')));
	_API_STORE_ACCOUNT_.set((localStorage.getObject('accounts', window.signIn)));
};

const postJsonToTenant = async (json, file) => {
	var formdata = new FormData();
	formdata.append("tenant", tenantId);
	formdata.append("filename", file);
	formdata.append("json", encodeURIComponent(JSON.stringify(json)));

	var requestOptions = {
		method: 'POST',
		body: formdata,
		redirect: 'follow'
	};

	await fetch(_POST_TO_TENANT, requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log('error', error));
}


//asyncGetJsonFromUrl 
const fetchJsonFromUrl = async (url, callback) => {
	return await fetch(url)
		.then(response => response.json())
		.then(data => {
			callback(data);
		})
		.catch(error => {
			console.error('Error:', error);
		});
}

//
function fetchSecretsFromJson(callback) {
	fetchJsonFromUrl(_SECRETS, (data) => {
		// _API_STORE_WEBSITE_.set(data);
		console.log("stores.js :: secrets :: ", data);

		const key = 'ImFkbWluIg==';
		const keyDecoded = JSON.parse(Storage.prototype.decode(key));
		console.log("stores.js :: secrets :: ", keyDecoded);
		console.log("stores.js :: secrets :: ", Storage.prototype.encode(JSON.stringify(keyDecoded)));

		localStorage.setObject('--store-secrets', data || JSON.stringify(''), 1);
		callback(data[key]);
	});
}

//
function fetchAuthenticatedFromJson() {
	fetchJsonFromUrl(_AUTHENTICATED, (data) => {
		// _API_STORE_WEBSITE_.set(data);
		console.log("stores.js :: authenticated :: ", data);
		localStorage.setObject('--store-authenticated', data || JSON.stringify(''), 1);
	});
}

//
function fetchWebsiteInfoFromJson() {
	fetchJsonFromUrl(_WEBSITE, (data) => {
		_API_STORE_WEBSITE_.set(data);
		localStorage.setObject('--store-website', data || JSON.stringify(''), 1);
		//getLatestDataFromLocalStorage();
		_NEWSLETTER_URL_.set(data.siteUrlNewsletter);
	});
}

//
function fetchProductsInfoFromJson() {
	fetchJsonFromUrl(_PRODUCTS, (data) => {
		_API_STORE_PRODUCTS_.set(data);
		localStorage.setObject('--store-products', data || (''), 1);
		//getLatestDataFromLocalStorage();
	});
}

//
function fetchGoogleInfoFromJson() {
	fetchJsonFromUrl(_GOOGLE, (data) => {
		_API_STORE_GOOGLE_.set(data);
		localStorage.setObject('--store-google', data || JSON.stringify(''), 24 * 60);
		//getLatestDataFromLocalStorage();
		//data?.calendarRedirect
		_CALENDAR_URL_.set(data?.calendarUrl);
		_CALENDAR_IFRAME_.set(data?.calendarIframe);
	});
}

//
function fetchAdmin() {
	_API_STORE_WEBSITE_.set(localStorage.getObject('--store-website', fetchWebsiteInfoFromJson))
	_API_STORE_PRODUCTS_.set(localStorage.getObject('--store-products', fetchProductsInfoFromJson))
	_API_STORE_GOOGLE_.set(localStorage.getObject('--store-google', fetchGoogleInfoFromJson))
	// fetchWebsiteInfoFromJson();
	// fetchProductsInfoFromJson();
	// fetchGoogleInfoFromJson();
}

//
const fetchProducts = async (filter) => {
	const response = await fetch(_PRODUCTS);
	let items;
	items = (await response.json());
	if (filter) {
		// find tag in items tag list with tag.v == filter
		items = await [...items.filter(item => {
			return item.tags.find(tag => tag.v == filter);
		})];
	}
	_API_STORE_PRODUCTS_.set(items);
	localStorage.setObject('--store-products', (items));
	//localStorage.setItem('--store-products-timestamp', new Date().getTime() + CACHE_DELAY);
}

//
const timeStampStillValid = (key) => {
	let now = new Date().getTime();
	let then = Number(localStorage.getItem(key));
	let diff = now > then;

	return diff;
}

// 
let initializeLatestDataCall = async (filter) => {
	fetchGoogleInfoFromJson();
	//fetchSecretsFromJson();
	fetchAuthenticatedFromJson();
	_API_STORE_PRODUCTS_.set((localStorage.getObject('--store-products', () => { fetchProducts(filter) })));
	return;

	// if (timeStampStillValid('--store-products-timestamp')) {
	// 	_API_STORE_PRODUCTS_.set((localStorage.getObject('--store-products')));
	// } else {
	// 	fetchProducts(filter);
	// }

	// return;

	// if (timeStampStillValid('--app-products-timestamp') &&
	// 	(localStorage.getItem('products'))) {
	// 	try {
	// 		products.set(JSON.parse(localStorage.getItem('products')));
	// 	} catch (e) {
	// 		console.log(e);
	// 		fetchProducts(filter);
	// 	}
	// } else {
	// 	fetchProducts(filter);
	// }
};

initializeLatestDataCall('in stock');
getAccountDataFromLocalStorage();


// let products = [];
// _API_STORE_PRODUCTS_.subscribe((value) => {
// 	products = value || [];
// });


/* transformProductNameToSlug */
const transformProductNameToSlug = (name) => {
	return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}

/* getProductBySlug */
const getProductBySlug = async (slug) => {
	console.log(_API_STORE_PRODUCTS_);
	let a;
	await _API_STORE_PRODUCTS_.subscribe(value => {
		a = value.find(product => transformProductNameToSlug(product.name) === slug);
	});
	return a;
}




export {
	fetchAdmin,
	fetchProducts,
	getAccountDataFromLocalStorage,
	getProductBySlug,
	fetchWebsiteInfoFromJson,
	fetchGoogleInfoFromJson,
	fetchSecretsFromJson,
	fetchAuthenticatedFromJson,
	transformProductNameToSlug,
	postJsonToTenant,
	_NEWSLETTER_URL_,
	_API,
	_TENANT,
	_STORAGE,
	_WEBSITE,
	_PRODUCTS,
	_GOOGLE,
	_POST_TO_TENANT,
	_POST_IMAGE_TO_TENANT
}