<script>
	import { base } from "$app/paths";
	import getObject from "../../utils/storage/storage.getobject.js";
	import { _API_STORE_WEBSITE_ } from "../../store/stores.js";

	import GTag from "./GTag.svelte";
    import { onMount } from "svelte";

	import {page} from "$app/stores";

	const website = localStorage.getObject("--store-website");
	$: seoPage = $page.route.id?.replaceAll("/","") || "";
	$: seoTitle = website.siteName + " " + seoPage;

	onMount(() => {
		console.log("SEO.svelte :: onMount ::", seoTitle);
	});
</script>

<svelte:head>
	<title>{seoTitle}</title>
	<meta name="description" content={website.siteDescription} />
	<link href="/" rel="canonical" />
	<!-- <meta name="viewport" content="width=device-width, initial-scale=1" /> -->
	<meta name="theme-color" content="#00024D" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta
		name="apple-mobile-web-app-status-bar-style"
		content="black-translucent"
	/>
	<meta name="apple-mobile-web-app-title" content={website.siteDescription} />
	<!-- <link rel="apple-touch-icon" href={base + "/logo_og.jpg"} /> -->
	<!-- <link rel="manifest" href="/manifest.json"> -->



	<link
		rel="icon"
		type="image/png"
		href={website.siteFavicon}
		sizes="192x192"
	/>

	<!--  Essential META Tags -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={website.siteDescription} />
	<meta property="og:image" content={website.siteLogo} />
	<meta property="og:url" content={website.siteUrl} />
	<meta property="og:description" content={website.siteDescription} />
	<meta property="og:site_name" content={website.siteName} />
	
	<!--  Non-Essential, But Required for Analytics -->
	<!-- <meta property="fb:app_id" content="your_app_id" /> -->
	
	<!--  Other -->
	<meta name="twitter:site" content={website.siteContactTwitter} />
	<meta name="twitter:card" content={website.siteLogo} />
	<meta name="twitter:image:alt" content={website.siteDescription} />
	<meta name="instagram:site" content={website.siteContactInstagram} />
	<meta name="facebook:site" content={website.siteContactFacebook} />
</svelte:head>

<GTag />