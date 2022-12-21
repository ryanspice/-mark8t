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
	import Navigation from "../Navigation.svelte";

	$: website = {};
	import { _API_STORE_WEBSITE_ } from "../../stores.js";
	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value;
	});

	onMount(() => {
		//set #hero class backgorund image
		let hero = document.getElementById("hero");
		hero.style.backgroundImage = "url(" + base + "/bg_openingday.jpg)";
	});
</script>

<a href={base + "/admin"} class="logo-fixed">
	<img src={base + "/logo_red.jpg"} alt="logo" class="logo-fixed" />
</a>
<Header />
<div id="hero" />
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
<Navigation />

<style>
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

	#hero {
		background-color: #10252e;
		opacity: 0.8;
		background: linear-gradient(0deg, #00000088 30%, #ffffff44 100%),
			no-repeat;
		background-size: cover;
		background-position: center;
		filter: sepia(50%) contrast(150%) saturate(200%) brightness(100%)
			hue-rotate(-15deg) grayscale(45%);

		min-height: 1920px;
		min-height: 1662px;
		max-height: 1662px;

		width: 100%;
		display: inline-block;
		border: none;
		outline: none;
		height: 100%;
		margin-bottom: 0px;
		background-position-y: 0;
		opacity: 0.1;
		position: relative;
		z-index: -1;
		position: absolute;
	}

	@media (max-width: 767px) {
		#hero {
			min-height: 720px;
			max-height: 720px;
		}
	}

	@media (max-width: 992px) {
		#hero {
			min-height: 720px;
			max-height: 720px;
			min-height: 1502px;
			max-height: 1502px;
		}
	}

	@media (max-width: 1200px) {
		#hero {
			min-height: 1662px;
			max-height: 1662px;
		}
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
