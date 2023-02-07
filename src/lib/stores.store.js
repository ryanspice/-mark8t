// cart store
import { writable } from 'svelte/store';

let checkout = JSON.parse(localStorage.getItem('checkout')) || {};
const checkoutStore = writable(checkout);

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartStore = writable(cart);

let summary = JSON.parse(localStorage.getItem('summary')) || {};
const summaryStore = writable(summary);

let thankYou = JSON.parse(localStorage.getItem('thankYou')) || {};
const thankYouStore = writable(thankYou);

export const addToCart = (product) => {

	// update and push to cart, but add quantity if already exists
	cartStore.update(items => {
		const index = items.findIndex(item => item.id === product.id);
		if (index !== -1) {
			if (!items[index].quantity) {
				items[index].quantity = 1;
			} else {
				items[index].quantity += 1;
			}
			localStorage.setItem('cart', JSON.stringify(items));
			return items;
		}

		if (!product.quantity)
			product.quantity = 0;
		product.quantity += 1;
		items.push(product);
		localStorage.setItem('cart', JSON.stringify(items));
		return items;
	});
}

export const removeFromCart = (productId) => {

	//update and remove from cart, but subtract quantity if already exists
	cartStore.update(items => {
		const index = items.findIndex(item => item.id === productId);
		if (index !== -1) {
			if (items[index].quantity > 0) {
				items[index].quantity -= 1;
				localStorage.setItem('cart', JSON.stringify(items));
				return items;
			} else {

				items = items.filter(item => item.id !== productId);
			}
		}
		localStorage.setItem('cart', JSON.stringify(items));
		return items;
	});
}


export const updateCheckout = (data) => {
	checkoutStore.update(checkout => {
		checkout = { ...checkout, ...data };
		localStorage.setItem('checkout', JSON.stringify(checkout));
		return checkout;
	});
}

export const updateSummary = (data) => {
	summaryStore.update(summary => {
		summary = { ...summary, ...data };
		localStorage.setItem('summary', JSON.stringify(summary));
		return summary;
	});
}

export const updateThankYou = (data) => {
	thankYouStore.update(thankYou => {
		thankYou = { ...thankYou, ...data };
		localStorage.setItem('thankYou', JSON.stringify(thankYou));
		return thankYou;
	});
}


export const clearCart = () => {
	cartStore.update(items => {
		items = [];
		localStorage.setItem('cart', JSON.stringify(items));
		return items;
	});

}

export {
	checkoutStore,
	cartStore,
	thankYouStore,
	summaryStore
}
