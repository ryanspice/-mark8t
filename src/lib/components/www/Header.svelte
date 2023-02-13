<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";
	import Header from "../header/Header.svelte";
	import Open from "../Open.svelte";
	import Address from "../Address.svelte";
	import ExternalLink from "../header/banner/ExternalLink.svelte";
	import ExternalLinkEmail from "../static/ExternalLinkEmail.svelte";
	import ExternalLinkPhone from "../static/ExternalLinkPhone.svelte";
	import ExternalLinkFacebook from "../static/ExternalLinkFacebook.svelte";
	import ExternalLinkInstagram from "../static/ExternalLinkInstagram.svelte";
	import ExternalLinkShare from "../static/ExternalLinkShare.svelte";
	import Navigation from "./Navigation.svelte";
	import Background from "./Background.svelte";

	$: website = {};
	$: layout = {
		navigation: [
			{ name: "HOME", url: base + "/" },
			{ name: "RETAIL", url: base + "/retail" },
			{ name: "ON TAP", url: base + "/products" },
			{ name: "EVENT SPACE", url: base + "/events" },
			{ name: "LOCATION", url: base + "/location" },
			{ name: "CALENDAR", url: base + "/calendar" },
			{ name: "ORDER NOW", url: base + "/order" },
		],
	};
	import { _API_STORE_WEBSITE_ } from "../../stores.js";
	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value;
	});
</script>

<!-- <a
	href={localStorage.getObject("accounts") === "accounts"
		? base + "/admin/secret"
		: base + "/admin/"}
	class="logo-fixed"
> -->
<a href={"/"} class="logo-fixed">
	<img src={base + "/logo_red.jpg"} alt="logo" class="logo-fixed" />
</a>
<Header />
<Background />
<Open />
<hr />
<main class="container">
	<div class="col">
		<div class="row" style="margin-top:0vh;">
			<div class="col center">
				<a href={base}>
					<img src={website.siteLogo} alt="logo" class="logo" />
				</a>
				<span>
					<Address />
				</span>
			</div>
			<div class="social col flex-end">
				<div class="row">
					<ExternalLinkFacebook label={website.siteContactFacebook} />
				</div>
				<br />
				<div class="row">
					<ExternalLinkInstagram
						label={website.siteContactInstagram}
					/>
				</div>
				<br />
				<div class="row">
					<ExternalLinkShare />
				</div>
				<br />
			</div>
		</div>
	</div>
</main>
<hr />
<Navigation layout />

<style>
	.open {
		transform: scale(0.24);
	}
	.logo-fixed {
		width: 50px;
		height: 50px;
		left: 0px;
		top: 0px;
		position: fixed;
		z-index: 999999;
	}

	.logo {
		width: 100%;
		height: auto;
	}

	span {
		position: relative;
		text-shadow: black 0em 0.25em 0em;
	}

	.social {
		position: relative;
		top: 28px;
	}

	@media (max-width: 767px) {
		.social {
			display: none;
		}
	}
</style>
