<script>
	import { place } from "../stores.js";
	let address;
	place.subscribe((value) => {
		address = value?.formatted_address;
	});
</script>

<div class="address w-100 center">
	{address?.split(", London, ")[0].replace("St", "St.") || ""}
</div>

<style>
	.address {
		font-weight: bold;
	}
</style>
