<script>
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	import {
		addToCart,
		removeFromCart,
		cartStore,
		clearCart,
	} from "../store/stores.store.js";

	import {
		Www,
		Calendar,
		Map,
		Header,
		Footer,
		Hours,
		ExternalLink,
		Static,
		Store,
		Pages,
		AgeGate,
		Navigation,
		_API_STORE_WEBSITE_,
	} from "../index";

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

	$: website = {};

	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value || {};
	});
	let data = {};

	function abandonCart() {
		clearCart();
	}

	function checkout() {
		// code to process checkout and payment
		// window.location.href = base + "/checkout";
		goto(base + "/checkout");
	}
</script>

<Header />
<Www.SEO title="Checkout" />
<Www.Background />
<Www.Open />
<Static.Logo />
<Store.Cart />
<Navigation />
<AgeGate />
<hr />
<Www.CartSummary {cart} {abandonCart} {checkout} />
<hr />
{#if cart.length !== 0}
	<section class="container">
		<iframe
			style="border:1px solid black; border-radius:16px; min-width:470px;max-width:680px;width: 50vw; margin:0px auto; height: 100%;height:65vh;max-height:800px;overflow:none;padding:0.5rem;border-radius:14px;outline:none;border:none;"
			src={base +
				"/payment-element?total=" +
				total +
				"&cart=" +
				encodeURIComponent(JSON.stringify(cart))}
		/>
	</section>
{/if}
<hr />
<Map />
<hr />

<!-- <hr />
<Newsletter />
<hr /> -->
<Header />
<Footer />
