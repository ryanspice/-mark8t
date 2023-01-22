<script>
	import { place } from "../stores.js";
	let address = "";
	place.subscribe((value) => {
		address = value?.vicinity;
		console.log("Address.svelte :: place.subscribe :: ", value);
	});
</script>

<div class="address w-100 center">
	{address}
</div>

<style>
	.address {
		font-weight: bold;
	}
</style>
