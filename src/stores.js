import { base } from '$app/paths';
import { writable } from 'svelte/store';

import "./utils/storage/storage.encode.js";
import "./utils/storage/storage.getobject.js";
import "./utils/storage/storage.setobject.js";

export const isOpen = writable(0);
export const opening_hours = writable(0);
export const place = writable(0);



const tenantId = import.meta.env.VITE_TENANT_ID;
const mapsId = import.meta.env.VITE_API_G_MAPS_ID;



export const _WEBSITE_QUOTE_ = writable('');
_WEBSITE_QUOTE_.set("You never know when it's not time for a Jager.");

export const _GOOGLE_MAP_API_URL_ = writable('');
_GOOGLE_MAP_API_URL_.set("https://maps.googleapis.com/maps/api/js?key=" + mapsId + "&libraries=places&callback=initMap");

export const _NEWSLETTER_URL_ = writable("");
_NEWSLETTER_URL_.set("https://cdn.forms-content.sg-form.com/747312ce-2554-11ed-87ec-fe032ff37937");

export const _CALENDAR_URL_ = writable("");
export const _CALENDAR_IFRAME_ = writable("");
_CALENDAR_URL_.set("https://calendar.google.com/calendar/ical/pnap24kf15uktd97i1a9m2ardc%40group.calendar.google.com/public/basic.ics");
_CALENDAR_IFRAME_.set("https://calendar.google.com/calendar/embed?src=pnap24kf15uktd97i1a9m2ardc%40group.calendar.google.com&ctz=America%2FToronto");

const URL = "https://dundasandsons.ca/" + base + "/_api";

const _API_TENANT_ = (import.meta.env.VITE_TENANT_ID).replaceAll("-", "_");
const _API_WEBSITE_ = URL + '/' + _API_TENANT_ + '/website.json?r=' + Math.random() * 999999;
const _API_PRODUCTS_ = URL + '/' + _API_TENANT_ + '/products.json?r=' + Math.random() * 999999;
const _API_GOOGLE_ = URL + '/' + _API_TENANT_ + '/google.json?r=' + Math.random() * 999999;
const API = URL + "/" + _API_TENANT_ + "/products.json?r=" + Math.random() * 999999;

const _API_URL_ = URL;
const _API_POST_TO_TENANT_ = URL + "/posttobid.php?r=" + Math.random() * 999999;
const _API_POST_IMAGE_TO_TENANT_ = URL + "/postimagetobid.php?r=" + Math.random() * 999999;

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

	await fetch(_API_POST_TO_TENANT_, requestOptions)
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
function fetchWebsiteInfoFromJson() {
	fetchJsonFromUrl(_API_WEBSITE_, (data) => {
		_API_STORE_WEBSITE_.set(data);
		localStorage.setObject('--store-website', data || JSON.stringify(''), 1);
		//getLatestDataFromLocalStorage();
	});
}

//
function fetchProductsInfoFromJson() {
	fetchJsonFromUrl(_API_PRODUCTS_, (data) => {
		_API_STORE_PRODUCTS_.set(data);
		localStorage.setObject('--store-products', data || (''), 1);
		//getLatestDataFromLocalStorage();
	});
}


//
function fetchGoogleInfoFromJson() {
	fetchJsonFromUrl(_API_GOOGLE_, (data) => {
		_API_STORE_GOOGLE_.set(data);
		localStorage.setObject('--store-google', data || JSON.stringify(''), 24 * 60);
		//getLatestDataFromLocalStorage();
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
	const response = await fetch(API);
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
	let then = (localStorage.getItem(key));
	let diff = now > then;

	return diff;
}

//
let a = async (filter) => {
	_API_STORE_PRODUCTS_.set((localStorage.getObject('--store-products', () => { fetchProducts(filter) })));
	return;
	if (timeStampStillValid('--store-products-timestamp')) {
		_API_STORE_PRODUCTS_.set((localStorage.getObject('--store-products')));
	} else {
		fetchProducts(filter);
	}

	return;

	if (timeStampStillValid('--app-products-timestamp') &&
		(localStorage.getItem('products'))) {
		try {
			products.set(JSON.parse(localStorage.getItem('products')));
		} catch (e) {
			console.log(e);
			fetchProducts(filter);
		}
	} else {
		fetchProducts(filter);
	}
};

a('in stock');
getAccountDataFromLocalStorage();

export {
	fetchAdmin,
	fetchProducts,
	getAccountDataFromLocalStorage,
	fetchWebsiteInfoFromJson,
	postJsonToTenant,
	URL,
	_API_URL_,
	_API_TENANT_
}