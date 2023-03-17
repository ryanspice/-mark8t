<script>
	import { base } from "$app/paths";
	import { addToCart, removeFromCart } from "../../store/stores.store.js";
	import QuickActionButtons from "./QuickActionButtons.svelte";
	let product = {
		id: 1,
		name: "Product 1",
		price: 9.99,
		quantity: 1,
	};

	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	let cartCount = 0;

	$: cartCount = cart.reduce(
		(count, item) =>
			item.id === product.id ? count + item.quantity : count,
		0
	);

	const goToCheckout = (id) => {
		if (cartCount > 0) {
			window.location.href = "/checkout";
		}
	};

	const handleAddToCart = () => {
		if (!product) return;
		if (product?.quantity === 0) {
			product.quantity = 1;
		}

		addToCart(product);
		product.quantity++;
	};

	const handleRemoveFromCart = () => {
		removeFromCart(product.id);
		product.quantity--;
	};

	const handleGoToCheckout = () => {
		goToCheckout(product.id);
		product.quantity--;
	};

	const handleMinus = () => {
		if (product.quantity > 1) {
			removeFromCart(product.id);
			product.quantity--;
		}
	};

	export let data;
	onMount(() => {
		console.log(data);
	});

	import Button from "@smui/button";
	import { onMount } from "svelte";
</script>

<br />

<br />
<!-- <div class="container"> -->
<!-- <div style="align-content:center; text-align:center;margin-bottom:2rem;">
	<Button
		on:click={() => {
			console.log(data.id);
			removeFromCart(data.id);
		}}>-</Button
	>
	<span>${cartCount} in cart</span>
	<Button on:click={addToCart}>+</Button>
	<QuickActionButtons />
</div> -->
<!-- </div> -->

<!-- <Button on:click={handleRemoveFromCart}>Remove from cart</Button>
<Button on:click={handleGoToCheckout}>Go to checkout</Button> -->
<style>
	.container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
