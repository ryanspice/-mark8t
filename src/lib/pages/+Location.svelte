<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	import {
		Landing,
		Store,
		Quote,
		Products,
		Newsletter,
		Static,
		Navigation,
		AgeGate,
		Www,
		Calendar,
		Map,
		Header,
		Footer,
		Hours,
		ExternalLink,
		_API_STORE_WEBSITE_,
	} from "../index";

	$: website = localStorage.getObject("website") || {};

	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value || {};
	});
</script>

<Header />
<Www.SEO title="Location" />
<Www.Background />
<Www.Open />
<Static.Logo />
<Store.Cart />
<Navigation />
<AgeGate />
<Map />
<Newsletter />
<hr />
<Header />
<Footer />
