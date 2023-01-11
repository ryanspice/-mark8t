<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	import { Logo } from "static";

	import styles from "./Landing.svelte.scss";

	import Header from "../components/header/Header.svelte";
	import Open from "../components/Open.svelte";
	import Address from "../../src/components/Address.svelte";
	import ExternalLink from "../../src/components/header/banner/ExternalLink.svelte";
	import ExternalLinkEmail from "../../src/components/static/ExternalLinkEmail.svelte";
	import ExternalLinkPhone from "../../src/components/static/ExternalLinkPhone.svelte";
	import ExternalLinkFacebook from "../../src/components/static/ExternalLinkFacebook.svelte";
	import ExternalLinkInstagram from "../../src/components/static/ExternalLinkInstagram.svelte";
	import ExternalLinkShare from "../../src/components/static/ExternalLinkShare.svelte";
	import Navigation from "../components/Navigation.svelte";

	//
	$: website = [];
	import { _API_STORE_WEBSITE_ } from "../stores.js";
	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value;
	});

	onMount(() => {
		//styles();
		//set #hero class backgorund image
		let hero = document.getElementById("hero");
		hero.style.backgroundImage = "url(" + base + "/20210624_221327.jpg)";
	});
</script>

<Logo />

<br />
<!-- <Navigation /> -->
<div id="hero" />
<Open />
<h1 class="mk8-site-name mdc-typography--headline1 fixed-width">
	<a href={base + "/"}
		><strong class="mk8-site-name">{website.siteName || ""}</strong></a
	>
</h1>
<main class="container">
	<div class="col" hidden>
		<div class="row" style="margin-top:0vh;">
			<!-- center -->
			<!-- <div class="col center">
				<a href={base}>
					{#if (website.logo)}
					<img src={website.siteLogo} alt="logo" class="logo" />
					{/if}
				</a>
				<span>
					<Address />
				</span>
			</div> -->
			<div class="social col flex-end hidden">
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
<Header />

<style>
	.fixed-width {
		max-width: 720px;
		margin: 0px auto;
	}

	@media screen and (max-width: 720px) {
		.fixed-width {
			max-width: 100%;
			font-size: 5rem;
		}
	}

	@media screen and (max-width: 620px) {
		.fixed-width {
			max-width: 100%;
			font-size: 4rem;
		}
	}

	@media screen and (max-width: 590px) {
		.fixed-width {
			max-width: 100%;
			font-size: 4rem;
		}
	}

	@media screen and (max-width: 480px) {
		.fixed-width {
			max-width: 100%;
			font-size: 3rem;
		}
	}
</style>
