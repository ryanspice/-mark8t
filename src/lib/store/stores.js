import { base } from '$app/paths';
import { writable } from 'svelte/store';
import { browser, dev } from "$app/environment";

import {
	baseUrl,
	tenantId,
	mapsId,
	mapsUrl,
	_NAME,
	_DOMAIN,
	_BASE,
	_TENANT,
	_API,
	_STORAGE,
	_SECRETS,
	_AUTHENTICATED,
	_WEBSITE,
	_PRODUCTS,
	_GOOGLE,
	_POST_TO_TENANT,
	_POST_IMAGE_TO_TENANT,
	CACHE_DELAY
} from "../utils/api/constants.js";

import {
	fetchSecretsFromJson,
	fetchAuthenticatedFromJson,
	fetchWebsiteInfoFromJson,
	fetchProductsInfoFromJson,
	fetchGoogleInfoFromJson,
	fetchLatestFromTenant
} from "../utils/api/index";


if (!browser)
	var window = {}

import "./stores.store.js";

import "../utils/storage/storage.encode.js";
import getObject from "../utils/storage/storage.getobject.js";
import setObject from "../utils/storage/storage.setobject.js";

export const isOpen = writable(0);
export const opening_hours = writable(0);
export const place = writable({
	"address": "",
	"vicinity": "string"
});

export const _WEBSITE_QUOTE_ = writable('');
_WEBSITE_QUOTE_.set("");

export const _GOOGLE_MAP_API_URL_ = writable('');
_GOOGLE_MAP_API_URL_.set(mapsUrl);

const _NEWSLETTER_URL_ = writable("");
export const _CALENDAR_URL_ = writable("");
export const _CALENDAR_IFRAME_ = writable("");

export const phone = writable("");
export const email = writable("");

export const _API_STORE_ACCOUNT_ = writable({});
export const _API_STORE_WEBSITE_ = writable({});
export const _API_STORE_PRODUCTS_ = writable([]);
export const _API_STORE_GOOGLE_ = writable({});

//
const getAccountDataFromLocalStorage = () => {
	// console.log('getAccountDataFromLocalStorage', JSON.parse(localStorage.getItem('accounts')));
	_API_STORE_ACCOUNT_.set((getObject('accounts', window?.signIn)));
};

//
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

//
function fetchAdmin() {
	_API_STORE_WEBSITE_.set(getObject('--store-website', fetchWebsiteInfoFromJson))
	_API_STORE_PRODUCTS_.set(getObject('--store-products', fetchProductsInfoFromJson))
	_API_STORE_GOOGLE_.set(getObject('--store-google', fetchGoogleInfoFromJson))
	// fetchWebsiteInfoFromJson();
	// fetchProductsInfoFromJson();
	// fetchGoogleInfoFromJson();
}

//
const fetchProducts = async (filter) => {
	const response = await fetch(_PRODUCTS);
	let items;
	items = (await response.json());
	// if (filter) {
	// 	// find tag in items tag list with tag.v == filter
	// 	items = await [...items.filter(item => {
	// 		return item.tags.find(tag => tag.v == filter);
	// 	})];
	// }
	_API_STORE_PRODUCTS_.set(items);
	setObject('--store-products', (items));
	//localStorage.setItem('--store-products-timestamp', new Date().getTime() + CACHE_DELAY);
}

//
const timeStampStillValid = (key) => {
	let now = new Date().getTime();
	let then = Number(getItem(key));
	let diff = now > then;

	return diff;
}

// 
let initializeLatestDataCall = async (filter) => {
	fetchLatestFromTenant();

	const latest = localStorage.getObject('--store-latest', () => { });


	console.log(latest);
	_API_STORE_PRODUCTS_.set((localStorage.getObject('--store-products', () => {
		// fetchProducts(filter) 
	})));


	// fetchGoogleInfoFromJson();
	//fetchSecretsFromJson();
	// fetchAuthenticatedFromJson();

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

// function which checks if a product as item has a tag, which is an array of tags, which contains the filter
function hasTag(item, tag) {
	let found = false;
	item.tags.forEach((item) => {
		if (item.v === tag) {
			found = true;
			// console.log(item, tag);
		}
		return found;
	});
	return found;
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