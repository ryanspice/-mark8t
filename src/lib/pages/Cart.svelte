<script>
	import { base } from "$app/paths";
	import { writable } from "svelte/store";

	import {
		addToCart,
		removeFromCart,
		cartStore,
		clearCart,
	} from "../stores.store.js";

	export let hideButtons = false;

	let cart = [];
	let cartCount = 0;
	cartStore.subscribe((value) => {
		cart = value;
	});

	// get ontario tax rate
	let tax = 0.08;
	let total = 0;

	$: {
		total = 0;
		cart.forEach((product) => {
			total += product.price * product.quantity;
		});
		total += total * tax;
	}

	function abandonCart() {
		clearCart();
	}

	function storeCart() {
		// code to store cart in local storage or database
	}

	function checkout() {
		// code to process checkout and payment
		window.location.href = base + "/checkout";
	}

	function viewcart() {
		window.location.href = base + "/cart";
	}
</script>

<div class="container">
	<h2 style="width:100%;text-align:center;">CHECKOUT</h2>
</div>
<hr />
<div class="container center">
	<div class="product-list w-100">
		<br />
		{#each cart as product}
			<div class="product">
				<h3>{product.name}</h3>
				<p>Quantity: {product.quantity}</p>
				<p>Price: ${product.price}</p>
			</div>
		{/each}
	</div>
</div>
<br />
<div class="container center">
	<div class="total">
		<h3>Total (including tax): ${total}</h3>
	</div>
</div>
{#if !hideButtons}
	<div class="container center">
		<div class="cart-actions">
			<button class="btn btn-danger" on:click={abandonCart}
				>Abandon Cart</button
			>
			<!-- <button class="btn btn-secondary" on:click={storeCart}>Save Cart</button> -->
			<button class="btn btn-primary" on:click={checkout}>Checkout</button
			>
			<!-- <button class="btn btn-primary" on:click={viewcart}>View Cart</button> -->
		</div>
	</div>
{/if}

<style>
</style>
