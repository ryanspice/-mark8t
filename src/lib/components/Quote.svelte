<script>

	import { _API_STORE_WEBSITE_, _WEBSITE_QUOTE_ } from '../../stores.js';
	let v;
	_WEBSITE_QUOTE_.subscribe(value => {
		v = value;
	});
	$: website = {};
	_API_STORE_WEBSITE_.subscribe(value => {
		website = value;
	});
</script>
<style>
	h3 {
		padding-top: 20vh;
		padding-bottom: 20vh;
		width: 100%;
		text-align: center;
	}
</style>

<h3>"{website.siteDescription || v}" </h3>