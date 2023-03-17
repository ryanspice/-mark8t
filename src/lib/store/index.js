
import {
	addToCart,
	removeFromCart,
	cartStore,
	clearCart
} from "./stores.store.js";

import {
	_API_STORE_PRODUCTS_,
	_API_STORE_WEBSITE_,
	_TENANT,
	_API,
	getProductBySlug,
	transformProductNameToSlug,
} from './stores.js';

import { setObject } from "../utils/storage/storage.setobject.js";

//
export const getProducts = async () => {
	if (typeof localStorage.getObject("--store-products") == "string") {
		let data = await fetch("https://mark8t.ca/storage/3988fc5a_af7d_4ffb_8ce4_06132bd037a2/products.json?r=268289.2881573935");
		let json = await data.json();
		// setObject("--store-products", json, 0);
		return setObject("--store-products", json, 0);
	}
}
export default {
	getProducts,
	getProductBySlug,
	transformProductNameToSlug,
	_API,
	_API_STORE_PRODUCTS_,
	_API_STORE_WEBSITE_,
	_TENANT
}