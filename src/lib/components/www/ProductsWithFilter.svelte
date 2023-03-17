<script>
	import { onMount } from "svelte";
	import { base } from "$app/paths";
	import { viewport } from "../../utils";
	import { fetchProducts } from "../../store/stores.js";
	import QuickActionButtons from "../store/QuickActionButtons.svelte";
	import ItemSectionWithFilter from "../ItemSectionWithFilter.svelte";
	export let filter = "";
	export let title = "";
	export let label = "";
	export let price = false;
	export let displayCount = 12;

	export let first;
	let frame;
	let initialized = false;

	//
	const adjustHeight = () => {
		// Lazy
		if (
			document.getElementById("effects").style.height ===
			document.getElementById("effects_target").scrollHeight
		) {
			return;
		}
		document.getElementById("effects").style.height =
			document.getElementById("effects_target").scrollHeight + "px";
		document.getElementById("effects").style.top =
			document.getElementById("effects_target").offsetTop + "px";
	};

	//
	const init = async () => {
		// if (!first) return;
		// await fetchProducts("in stock");
		// fetchProducts("in stock");
		frame.src = base + "/suds/index.html";
		frame.onload = () => {
			console.log("iFrame loaded");
			setTimeout(() => {
				adjustHeight();
				setTimeout(() => {
					document.getElementById("effects").style.opacity = 1;
				}, 1100);
			}, 1100);
		};
	};

	//
	const handleEnterViewport = () => {
		if (!initialized) {
			init();
			initialized = true;
		}
	};
</script>

<svelte:window on:resize={adjustHeight} />

{#if first}
	<iframe
		use:viewport
		on:enterViewport={handleEnterViewport}
		id="effects"
		src=""
		bind:this={frame}
		frameborder="0"
		scrolling="no"
		style="opacity:0;position:absolute; top:0; left:0; width:100%; height:0; overflow:hidden;"
	/>
{/if}
<ItemSectionWithFilter {label} {title} {filter} {price} {displayCount} />
