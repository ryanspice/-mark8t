<script>
	import { loadStripe } from "@stripe/stripe-js";
	import { Elements } from "svelte-stripe";
	import { onMount } from "svelte";

	export let key;
	let stripe = null;

	onMount(async () => {
		stripe = await loadStripe(key);
	});
</script>

{#if stripe}
	<Elements {stripe}>
		<!-- this is where your Stripe components go -->
	</Elements>
{/if}
