<script>
	import { _API_STORE_WEBSITE_, _WEBSITE_QUOTE_ } from "../../../stores.js";
	let quoteText;
	_WEBSITE_QUOTE_.subscribe((value) => {
		quoteText = value;
	});
	$: website = {};
	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value;
	});
</script>

<h3>{quoteText || website?.siteDescription || ""}</h3>

<style>
	h3 {
		padding-top: 20vh;
		padding-bottom: 20vh;
		width: 100%;
		text-align: center;
	}
</style>
