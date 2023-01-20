<script>
	import { place } from "../stores.js";
	let address;
	place.subscribe((value) => {
		// address = value?.formatted_address;
		address = value?.vicinity;
		console.log("Address.svelte :: place.subscribe :: ", value);
	});
</script>

<div class="address w-100 center">
	{address}
	<!-- {address?.split(", London, ")[0].replace("St", "St.") || ""} -->
</div>

<style>
	.address {
		font-weight: bold;
	}
</style>
