<script>
	import { base } from "$app/paths";
	import QuickActionButtons from "../store/QuickActionButtons.svelte";
	export let abandonCart = () => {};
	export let checkout = () => {};
	export let cart = [];
	export let hideButtons = false;
	let total = 0;
	let tax = 0.13;
	$: {
		total = 0;
		cart.forEach((product) => {
			total += product.price * product.quantity;
		});
		total += total * tax;
	}

	const convertToDollars = (price) => {
		return (price / 100).toFixed(2);
	};
</script>

<h2 style="width:100%;text-align:center;font-weight:bold;">CHECKOUT</h2>
<!-- {#if !hideButtons}}
	<QuickActionButtons />
{/if} -->
<hr />
<div class="container center">
	<div class="product-list w-100">
		<br />
		{#each cart as product}
			<div class="product">
				<h3>{product.name}</h3>
				<p>Quantity: {product.quantity}</p>
				<p>Price: ${product.price / 100}</p>
			</div>
		{/each}
	</div>
</div>
<br />
<div class="container center">
	<div class="total">
		{#if cart.length !== 0}
			<h3 style="width:100%;text-align:center;">
				Total (including tax): ${convertToDollars(total)}
			</h3>
		{/if}
		{#if cart.length === 0}
			<h3>
				Oops! There's nothing here! <br /><br /><a
					href={base + "/products"}>View Store</a
				>
			</h3>
		{/if}
	</div>
</div>
<hr />
<br />
{#if !hideButtons}
	<QuickActionButtons />
{/if}
