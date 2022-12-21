<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	import ItemSection from "../ItemSection.svelte";
	import { fetchProducts } from "../../stores.js";

	let frame;

	//
	$: products = [];
	import { _API_STORE_PRODUCTS_ } from "../../stores.js";
	_API_STORE_PRODUCTS_.subscribe((value) => {
		products = value;
	});

	//
	onMount(() => {
		fetchProducts("in stock");
		frame.src = base + "/suds/index.html";
		frame.onload = () => {
			console.log("iFrame loaded");
			setTimeout(() => {
				// Lazy
				if (
					document.getElementById("effects").style.height ===
					document.getElementById("section__products").scrollHeight
				) {
					return;
				}
				document.getElementById("effects").style.height =
					document.getElementById("section__products").scrollHeight +
					"px";
				setTimeout(() => {
					// Lazy
					if (
						document.getElementById("effects").style.height ===
						document.getElementById("section__products")
							.scrollHeight
					) {
						return;
					}
					document.getElementById("effects").style.height =
						document.getElementById("section__products")
							.scrollHeight + "px";
					setTimeout(() => {
						// Lazy
						if (
							document.getElementById("effects").style.height ===
							document.getElementById("section__products")
								.scrollHeight
						) {
							return;
						}
						document.getElementById("effects").style.height =
							document.getElementById("section__products")
								.scrollHeight + "px";
					}, 1000);
				}, 1000);
			}, 100);
		};
	});
</script>

<section id="section__products">
	<iframe
		id="effects"
		src=""
		bind:this={frame}
		frameborder="0"
		scrolling="no"
	/>
	<div>
		<div class="row">
			<div class="column">
				<div>
					<h2>what is</h2>
					<h1>ON TAP</h1>
					<h3>(today, or something like that)</h3>
					<ItemSection filter="in stock" />
				</div>
			</div>
		</div>
		<!-- <div class='row'>
			<div class='column'>
				<div class='left-column'>
					<h1>coming soon</h1>
					<ItemSection filter="coming soon" />
				</div>
			</div>
			<div class='column'>
				<div class='green-column'>
					<h1>out of stock</h1>
					<ItemSection filter="out of stock" />
				</div>
			</div>
		</div> -->
	</div>
</section>

<style>
	h1 {
		font-weight: bold;
		width: 100%;
		text-align: center;
	}

	h2 {
		width: 100%;
		text-align: center;
		font-weight: lighter;
		padding-top: 3rem;
	}

	h3 {
		width: 100%;
		text-align: center;
		margin-bottom: 4rem;
	}

	section {
		margin: 0px auto;
		background: black;
		text-indent: 2rem;
	}

	iframe {
		background: transparent;
		overflow: visible;
		width: 100vw;
		height: 100%;
		position: absolute;
		padding-top: 130px;
		user-select: none;
		pointer-events: none;
	}

	.row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
	}

	.column {
		display: flex;
		flex-direction: column;
		flex-basis: 100%;
		flex: 1;
	}

	#section__products {
		display: block;
		overflow: hidden !important;
	}
</style>
