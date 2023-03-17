<script>
	import { base } from "$app/paths";
	import { cartStore, addToCart } from "../../store/stores.store.js";

	import Button, { Label } from "@smui/button";
	import IconButton, { Icon } from "@smui/icon-button";
	let cart = [];
	let cartCount = 0;

	$: cart = cartStore.subscribe((value) => {
		// console.log(value);
		cart = value;
		// set cartCount to the number of items in the cart
		// for each item add the quantities together
		// if no quantity is set, add 1
		if (!cart.reduce) return;
		cartCount = cart.reduce(
			(count, item) => count + (item.quantity || 1),
			0
		);
	});
</script>

<div class="cart">
	<a href={base + "/cart"}>
		<span class="label"><Label>{cartCount}</Label></span>
		<span class="icon">
			<IconButton class="material-icons">shopping_bag</IconButton>
		</span>
	</a>
</div>

<style>
	.label {
		position: relative;
		top: -4px;
		left: 5px;
		z-index: 5;
		font-size: 15px;
		color: var(--primary);
	}
	.cart {
		transform: scale(1.75);
		color: var(--primary);
		position: fixed;
		bottom: 0;
		right: 0;
		/* background-color: #fff; */
		padding: 20px;
		/* border: 1px solid #ccc; */
		z-index: 999;
	}
	.icon {
		width: 25px;
	}
</style>
