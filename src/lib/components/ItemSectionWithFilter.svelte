<script>
	import { base } from "$app/paths";
	import Button, { Label } from "@smui/button";
	import { onMount } from "svelte";

	import getObject from "../utils/storage/storage.getobject";

	import {
		_API_STORE_PRODUCTS_,
		transformProductNameToSlug,
	} from "../stores.js";

	import { addToCart, removeFromCart, cartStore } from "../stores.store.js";

	import QuickActionButtons from "./store/QuickActionButtons.svelte";
	export let price = false;
	export let filter = "";
	export let label = "";
	export let title = "";
	export let displayCount = 12;
	let showAll = false;

	let products =
		getObject("--store-products") === "products"
			? []
			: getObject("--store-products");
	let order = [];

	let cart =
		getObject("--store-cart") === "--store-cart"
			? []
			: getObject("--store-cart");

	let cartCount = 0;

	$: products = [];
	$: orderCount = [];

	function getQuantityFromItemId(id) {
		let quantity = 0;
		// console.log(cart);
		if (!cart || cart.length === 0) {
			return 0;
		}
		try {
			// console.log("cart", cart);
			cart.forEach((item) => {
				if (item.id === id) {
					quantity = item.quantity || 1;
				}
			});
		} catch (error) {
			console.log(error);
		}
		// cart.forEach((item) => {
		// 	if (item.id === id) {
		// 		quantity = item.quantity;
		// 	}
		// });
		order[id] = quantity || 0;
		return quantity || 0;
	}

	// function which checks if a product as item has a tag, which is an array of tags, which contains the filter
	function hasTag(item, tag) {
		let found = false;
		item.tags.forEach((item) => {
			if (item.v === tag) {
				found = true;
				// console.log(item, tag);
			}
			return found;
		});
		return found;
	}

	let showActionButtons = 0;

	const checkIfInCart = () => {
		let any = 0;
		products.forEach((productItem) => {
			if (productItem.quantity > 0) {
				any++;
			}
		});
		if (any) {
			showActionButtons = 1;
		} else {
			showActionButtons = 0;
		}
	};

	//
	onMount(() => {
		_API_STORE_PRODUCTS_.subscribe((value) => {
			products = value || [];
			products.forEach((item, index) => {
				order[item.id] = 0;
				getQuantityFromItemId(item.id);
			});
			products = products.filter((item) => {
				return hasTag(item, filter);
			});
			checkIfInCart();
		});

		cartStore.subscribe((value) => {
			cart = value;
			checkIfInCart();
		});
	});

	let alive = 0;
</script>

<hr />
<div style="text-align:center;width:100%;display:block;clear:both;">
	<h2 class="filter-title">{label}</h2>
	<h1 class="filter-title">{title || filter}</h1>
	<br />
</div>
<hr />
<div class="filter-grid">
	{#each products as item, index}
		{#if showAll || index <= displayCount}
			<a
				class="product-entry"
				href={base +
					"/products/" +
					transformProductNameToSlug(item.name)}
			>
				<div class="col center image">
					<img width="225px" src={item.thumb} />
					<div class="filter-item">{item.name}</div>
					<img
						class="thumb"
						width="225px"
						src={base + ("/" + item?.image?.replace("/", ""))}
					/>
					<br />
					{#if item.ibu}
						<span class="left">IBU: {item.ibu}</span>
					{/if}
					{#if item.abv}
						<span class="right"
							>ABV:
							{item.abv}</span
						><br />
					{/if}
					{#if price == true}
						<div>
							<Button
								style="position:relative;top:-40px;z-index:3;"
								on:click={(event) => {
									// decrement();
									removeFromCart(item.id);
									getQuantityFromItemId(item.id);
									event.preventDefault();
									event.stopPropagation();
								}}>-</Button
							>
							<Button
								style="position:relative;top:-40px;z-index:3;"
								on:click={(event) => {
									increment();
									event.preventDefault();
									event.stopPropagation();
								}}>{order[item.id] || 0}</Button
							>
							<Button
								style="position:relative;top:-40px;z-index:3;"
								on:click={async (event) => {
									await addToCart(item);
									getQuantityFromItemId(item.id);
									event.preventDefault();
									event.stopPropagation();
								}}>+</Button
							>
						</div>
					{/if}
				</div>
			</a>
		{/if}
		{#if !showAll && index === displayCount && index < products.length - 1}
			<a />
			<a />
			<a />
			<a
				style=" padding-right:4rem; flex-direction: column;text-align:right;"
				on:click={() => {
					showAll = true;
				}}>show all</a
			>
		{/if}
	{/each}
</div>
<div>
	{#if price && showActionButtons > 0}
		<QuickActionButtons />
	{/if}
</div>

<div class="filter-grid" hidden>
	{#each products as item, index}
		{#if hasTag(item, filter)}
			<a
				class="product-entry"
				href={base +
					"/products/" +
					transformProductNameToSlug(item.name)}
			>
				<div>
					<div class="col center image">
						<img width="325" src={item.thumb} />
					</div>
					<div class="content">
						<h2>{item.name}</h2>
						<img
							class="thumb"
							width="325"
							src={base + ("/" + item?.image?.replace("/", ""))}
						/>
						<br />
						{#if item.ibu}
							<span class="left">IBU: {item.ibu}</span>
						{/if}
						{#if item.abv}
							<span class="right"
								>ABV:
								{item.abv}</span
							><br />
						{/if}
						<br />
					</div>
				</div>
			</a>
			{#if price == true}
				<div class="product-buttons">
					<Button
						style="position:relative;top:-124px;z-index:214;"
						on:click={(event) => {
							// decrement();
							removeFromCart(item.id);
							getQuantityFromItemId(item.id);
							event.preventDefault();
							event.stopPropagation();
						}}>-</Button
					>
					<Button
						style="position:relative;top:-124px;z-index:214;"
						on:click={(event) => {
							increment();
							event.preventDefault();
							event.stopPropagation();
						}}>{order[item.id] || 0}</Button
					>
					<Button
						style="position:relative;top:-124px;z-index:214;"
						on:click={async (event) => {
							await addToCart(item);
							getQuantityFromItemId(item.id);
							event.preventDefault();
							event.stopPropagation();
						}}>+</Button
					>
				</div>
			{/if}
		{/if}
	{/each}
</div>

<style>
	.filter-grid {
		display: grid;
		grid-template-columns: repeat(1, 1fr);
		grid-gap: 20px;
		max-width: 1424px;
		margin: 0px auto;
	}

	.filter-item {
		text-align: center;
	}

	/* Responsive styles */
	@media (min-width: 667px) {
		.filter-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 824px) {
		.filter-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 1520px) {
		.filter-grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	@media (max-width: 479px) {
		.filter-grid {
			grid-template-columns: 1fr;
		}
	}
	a {
		text-decoration: none;
		display: flex;
		text-align: center;
		width: 100%;
		color: var(--primary);
	}

	.content {
		margin: 0px auto;
		max-width: 1100px;
		width: 100%;
		position: relative;
		top: -55px;
		left: 0px;
		z-index: 2;
		text-align: center;
		text-shadow: none;
		font-weight: 600;
	}

	img {
		position: relative;
	}

	h2 {
		position: relative;
		left: 0px;
		top: 20px;
		font-weight: 600;
	}

	.thumb {
		position: relative;
		transform: scale(1.2);
		left: 0;
		top: -38px;
		z-index: -1;
	}

	.left {
		position: relative;
		top: -50px;
		left: 5px;
		font-size: 1.25rem;
	}

	.right {
		position: relative;
		top: -50px;
		left: 5px;
		margin-left: 5px;
		font-size: 1.25rem;
	}
	.product-container {
		display: flex;
		align-content: center;
		flex-wrap: wrap;
		flex-direction: column;
	}
	.product-buttons {
		position: relative;
		top: 75px;
		z-index: 3;
		transform: scale(1.5);
	}
</style>
