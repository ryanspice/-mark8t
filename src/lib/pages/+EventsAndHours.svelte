<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	import {
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

	let website = localStorage.getObject("website") || {};

	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value || {};
	});
</script>

<!-- <Header /> -->
<Www.SEO title="Events & Hours" />
<!-- <Www.Background /> -->
<!-- <Www.Open /> -->
<!-- <Static.Logo /> -->
<!-- <AgeGate /> -->
<!-- <Navigation /> -->
<section id="section__hours" class="center w-100">
	<h2>Events or Bookings</h2>
	<br />
	<p>
		For events or bookings, please contact us at <br />
		<ExternalLink href="mailto:	{website.siteContactEmail}"
			>{website.siteContactEmail}</ExternalLink
		>
		<br /> or call us at<br />
		<ExternalLink href="tel:{website.siteContactPhone}"
			>{website.siteContactPhone}</ExternalLink
		>
	</p>
	<br />
	<br />
	<br />
	<br />
	<br />
	<h2>Hours</h2>
	<br />
	<Hours />
	<br />
</section>
<Calendar />
<Map />

<style>
	h3,
	span {
		width: 100%;
	}

	#section__hours,
	#section__bookings {
		padding-top: 168px;
		padding-bottom: 168px;
	}
</style>
