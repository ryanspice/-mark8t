<script>
	import { base } from "$app/paths";
	import Button, { Label } from "@smui/button";
	import { onMount } from "svelte";

	import {
		_API_STORE_PRODUCTS_,
		transformProductNameToSlug,
	} from "../stores.js";

	import { addToCart, removeFromCart, cartStore } from "../stores.store.js";

	let products = localStorage.getObject("--store-products") || [];
	let order = [];

	_API_STORE_PRODUCTS_.subscribe((value) => {
		products = value || [];
		products.forEach((item, index) => {
			order[item.id] = 0;
			getQuantityFromItemId(item.id);
		});
	});

	let cart = localStorage.getObject("cart") || [];
	let cartCount = 0;

	$: products = [];
	$: orderCount = [];

	function getQuantityFromItemId(id) {
		let quantity = 0;
		try {
			console.log("cart", cart);
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
	export let price = true;
	export let filter = "";
	// function which checks if a product as item has a tag, which is an array of tags, which contains the filter
	function hasTag(item, tag) {
		let found = false;
		item.tags.forEach((item) => {
			if (item.v === tag) {
				found = true;
				console.log(item, tag);
			}
			return found;
		});
		return found;
	}

	//
	onMount(() => {
		cartStore.subscribe((value) => {
			cart = value;
		});
		// console.log("products", products);
		// console.log("cart", cart);
		// console.log("order", order);
		// console.log("orderCount", orderCount);
	});
</script>

<hr />
<section class="content product-container">
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
</section>

<style>
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
		font-size: 1.5rem;
	}

	.right {
		position: relative;
		top: -50px;
		left: 5px;
		margin-left: 5px;
		font-size: 1.5rem;
	}
	.product-container {
		display: flex;
		align-content: center;
		flex-wrap: wrap;
		flex-direction: column;
	}
	.product-entry {
		width: 375px;
	}
	.product-buttons {
		position: relative;
		top: 75px;
		z-index: 3;
		transform: scale(1.5);
	}
</style>
