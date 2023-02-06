<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	import {
		Newsletter,
		Www,
		Calendar,
		Map,
		_API_STORE_WEBSITE_,
	} from "../index";

	$: website = localStorage.getObject("website") || {};

	onMount(() => {
		_API_STORE_WEBSITE_.subscribe((value) => {
			website = value;
		});
	});
</script>

<Www.SEO title="Location" />
<Calendar />
<Map />
<Newsletter />
