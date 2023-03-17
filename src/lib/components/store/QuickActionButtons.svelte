<script>
	import { base } from "$app/paths";
	import { goto } from "$app/navigation";
	import {
		addToCart,
		removeFromCart,
		cartStore,
		clearCart,
	} from "../../store/stores.store.js";

	function abandonCart() {
		clearCart();
		// goto(base + "/");
	}

	function checkout() {
		// code to process checkout and payment
		// window.location.href = base + "/checkout";
		goto(
			base +
				"/checkout?total=" +
				total +
				"&cart=" +
				encodeURIComponent(JSON.stringify(cart))
		);
	}

	function retail() {
		// code to process checkout and payment
		// window.location.href = base + "/checkout";
		goto(
			base +
				"/retail?total=" +
				total +
				"&cart=" +
				encodeURIComponent(JSON.stringify(cart))
		);
	}

	let cart = [];
	let cartCount = 0;
	cartStore.subscribe((value) => {
		cart = value;
	});

	// get ontario tax rate
	// let tax = 0.08;
	let total = 0;

	$: {
		total = 0;
		if (typeof cart !== "string")
		cart.forEach((product) => {
			total += product.price * product.quantity;
		});
		// total += total * tax;
	}
	export let hideControls = false;
</script>

<div class="container center" style="position:relative;z-index: 3;">
	<div class="cart-actions center">
		{#if !hideControls}
			{#if cart.length !== 0}
				<button
					class="btn btn-danger"
					style="margin-right:0px;"
					on:click={abandonCart}>Abandon Cart</button
				>
				{#if window.location.href.indexOf("/checkout") == -1}
					<!-- <button class="btn btn-secondary" on:click={storeCart}>Save Cart</button> -->
					<button
						class="btn btn-primary"
						style="margin-left:0px;margin-right:0px;"
						on:click={checkout}>Checkout</button
					>
				{:else}
					<button
						class="btn btn-primary"
						style="margin-left:0px;margin-right:0px;"
						on:click={retail}>View Store</button
					>
				{/if}

				{#if window.location.href.indexOf("/cart") == -1}
					<button
						class={"btn btn-primary"}
						style="margin-left:0px;"
						on:click={() => {
							goto(base + "/cart");
						}}>View Cart</button
					>
				{:else}
					<button
						class="btn btn-primary"
						style="margin-left:0px;"
						on:click={() => {
							goto(base + "/retail");
						}}>View Store</button
					>
				{/if}
			{/if}
		{/if}
	</div>
</div>

<style>
	.cart-actions {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
	.cart-actions > button {
		/* min-width: 256px; */
		margin: 0px auto;
		font-family: "Open Sans", sans-serif;
		text-transform: uppercase;
		background-color: transparent;
		color: var(--secondary);
		color: var(--primary);
		border: var(--secondary) 1px solid;
		font-weight: 600;
	}

	.cart-actions > button:hover {
		text-transform: uppercase;
		background-color: transparent;
		color: var(--primary);
		border: var(--primary) 1px solid;
		font-weight: 600;
	}
</style>
