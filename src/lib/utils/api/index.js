import {
	_SECRETS,
	_AUTHENTICATED,
	_WEBSITE,
	_PRODUCTS,
	_GOOGLE,
	_LATEST,
} from "../api/constants.js";

import { fetchJsonFromUrl } from "../api/functions.js";

import {

	_API_STORE_WEBSITE_,
	_NEWSLETTER_URL_,
	_API_STORE_PRODUCTS_,
	_API_STORE_GOOGLE_,
	_CALENDAR_URL_,
	_CALENDAR_IFRAME_,
} from "../../store/stores.js";

import { setObject } from "../storage/storage.setobject.js";

// fetch latest.php from tenant
// https://mark8t.ca/storage/{tenantid}/latest.php?r=231231
export function fetchLatestFromTenant() {
	fetchJsonFromUrl(_LATEST, (data) => {
		// _API_STORE_WEBSITE_.set(data);
		console.log("stores.js :: latest :: ", data);
		setObject('--store-latest', data || JSON.stringify(''), 1);
	});
}


//
export function fetchSecretsFromJson(callback) {
	fetchJsonFromUrl(_SECRETS, (data) => {
		// _API_STORE_WEBSITE_.set(data);
		console.log("stores.js :: secrets :: ", data);

		const key = 'ImFkbWluIg==';
		const keyDecoded = JSON.parse(Storage.prototype.decode(key));
		console.log("stores.js :: secrets :: ", keyDecoded);
		console.log("stores.js :: secrets :: ", Storage.prototype.encode(JSON.stringify(keyDecoded)));

		setObject('--store-secrets', data || JSON.stringify(''), 1);
		callback(data[key]);
	});
}

//
export function fetchAuthenticatedFromJson() {
	fetchJsonFromUrl(_AUTHENTICATED, (data) => {
		// _API_STORE_WEBSITE_.set(data);
		console.log("stores.js :: authenticated :: ", data);
		setObject('--store-authenticated', data || JSON.stringify(''), 1);
	});
}

//
export function fetchWebsiteInfoFromJson() {
	fetchJsonFromUrl(_WEBSITE, (data) => {
		_API_STORE_WEBSITE_.set(data);
		setObject('--store-website', data || JSON.stringify(''), 1);
		//getLatestDataFromLocalStorage();
		_NEWSLETTER_URL_.set(data.siteUrlNewsletter);
	});
}

//
export function fetchProductsInfoFromJson() {
	fetchJsonFromUrl(_PRODUCTS, (data) => {
		_API_STORE_PRODUCTS_.set(data);
		setObject('--store-products', data || (''), 1);
		//getLatestDataFromLocalStorage();
	});
}

//
export function fetchGoogleInfoFromJson() {
	fetchJsonFromUrl(_GOOGLE, (data) => {
		_API_STORE_GOOGLE_.set(data);
		setObject('--store-google', data || JSON.stringify(''), 24 * 60);
		//getLatestDataFromLocalStorage();
		//data?.calendarRedirect
		_CALENDAR_URL_.set(data?.calendarUrl);
		_CALENDAR_IFRAME_.set(data?.calendarIframe);
	});
}
