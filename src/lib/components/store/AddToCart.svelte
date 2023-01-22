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
</script>

<div>
	<button on:click={handleMinus}>-</button>
	<span>{cartCount} in cart</span>
	<button on:click={handleAddToCart}>+</button>
</div>
<button on:click={handleRemoveFromCart}>Remove from cart</button>
<button on:click={handleGoToCheckout}>Go to checkout</button>
