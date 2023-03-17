<script>
	export let data;
	import QuickActionButtons from "../store/QuickActionButtons.svelte";
	import {
		addToCart,
		removeFromCart,
		cartStore,
		clearCart,
	} from "../../store/stores.store.js";

	import { productTagsContain, productAvailable } from "../../utils";

	let product = {};
	product = data;
	let cart = [];

	//
	const handleAddToCart = () => {
		if (productAvailable(product)) {
			addToCart(product);
			product.quantity++;
		}
	};
</script>

<div class="product-view">
	<div
		class="product-image"
		style={"--image-src:url('" + data.thumb + "')"}
	/>
	<div class="product-info">
		<div class="product-name">{product.name}</div>
		<div class="product-price">${product.price / 100}</div>
		<div class="product-description">{product.description}</div>
		<!-- <button class="add-to-cart-button" on:click={handleAddToCart}
			>Add to Cart</button
		> -->
	</div>
</div>

<style>
	.product-view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.product-image {
		width: 250px;
		height: 250px;
		background-image: var(--image-src);
		background-size: cover;
	}
	.product-info {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 1rem;
	}
	.product-name {
		font-size: 1.5rem;
		font-weight: bold;
		text-align: center;
	}
	.product-price {
		font-size: 1.25rem;
		margin-top: 0.5rem;
	}
	.product-description {
		margin-top: 1rem;
		text-align: center;
		font-size: 1rem;
		width: 80%;
	}
	.add-to-cart-button {
		margin-top: 1rem;
		padding: 1rem;
		background-color: green;
		color: white;
		cursor: pointer;
		text-align: center;
		border: none;
		border-radius: 5px;
		outline: none;
		box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
	}
	.add-to-cart-button:hover {
		background-color: #2e7d32;
	}
	.add-to-cart-button:active {
		background-color: #005005;
	}
	.add-to-cart-button:focus {
		background-color: #1b5e20;
	}
	/* Accessibility styles */
	.add-to-cart-button:active,
	.add-to-cart-button:focus {
		box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.2),
			0px 0px 0px 4px rgba(255, 255, 255, 0.5);
	}
</style>
