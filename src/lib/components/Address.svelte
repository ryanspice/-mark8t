<script>
	import { onMount } from "svelte";
	import { place } from "../stores.js";
	let address = "";
	onMount(() => {
		place.subscribe((value) => {
			address = value?.vicinity;
			console.log("Address.svelte :: place.subscribe :: ", value);
		});
	});
</script>

<div class="address w-100 center">
	{address || ""}
</div>

<style>
	.address {
		font-weight: bold;
	}
</style>
