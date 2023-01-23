<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { writable } from "svelte/store";

	import {
		addToCart,
		removeFromCart,
		cartStore,
		clearCart,
	} from "../stores.store.js";

	import {
		AgeGate,
		Www,
		Header,
		Static,
		Navigation,
		Map,
		Store,
		Footer,
	} from "../index.js";

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

	function storeCart() {
		// code to store cart in local storage or database
	}
	function viewcart() {
		// window.location.href = base + "/cart";
		goto(base + "/cart");
	}
</script>

<Header />
<Www.SEO title="Cart" />
<Www.Background />
<Www.Open />
<Static.Logo />
<Store.Cart />
<Navigation />
<AgeGate />
<hr />
<Www.CartSummary {cart} {abandonCart} {checkout} />
<hr />
<!-- <section class="content center">

</section> -->
<hr />
<Map />
<Header />
<Footer />
