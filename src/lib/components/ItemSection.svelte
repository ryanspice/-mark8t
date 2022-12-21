<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";
	let products = [];
	import { _API_STORE_PRODUCTS_ } from "../stores.js";
	_API_STORE_PRODUCTS_.subscribe((value) => {
		products = value || [];
	});
</script>

{#each products as item}
	<section>
		<div class="col center image">
			<img width="325" src={item.thumb} />
		</div>
		<div class="content">
			<h2>{item.name}</h2>
			<img
				class="thumb"
				width="325"
				src={base + ("/" + item.image.replace("/", ""))}
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
	</section>
{/each}

<style>
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
</style>
