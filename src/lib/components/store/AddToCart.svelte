<script>
	import { base } from "$app/paths";
	import { addToCart, removeFromCart } from "../../stores.store.js";

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
	import Button from "@smui/button";
</script>

<div class="product-container">
	<div class="quantity-container">
		<Button aria-label="minus" on:click={handleMinus}>-</Button>
		<span class="quantity-text">{cartCount} in cart</span>
		<Button aria-label="add" on:click={handleAddToCart}>+</Button>
	</div>
	<Button
		class="remove-button"
		aria-label="remove"
		on:click={handleRemoveFromCart}>Remove from cart</Button
	>
	<Button
		class="checkout-button"
		aria-label="checkout"
		on:click={handleGoToCheckout}>Go to checkout</Button
	>
</div>

<style>
	.product-container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.quantity-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 10px;
	}
	.quantity-text {
		margin: 0 10px;
	}
	.remove-button,
	.checkout-button {
		width: 200px;
		margin-top: 10px;
	}
</style>
