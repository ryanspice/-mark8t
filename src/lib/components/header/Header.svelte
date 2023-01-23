<script>
  import { base } from "$app/paths";
  import Contact from "./Contact.svelte";

  //
  $: website = [];
  import { _API_STORE_WEBSITE_ } from "../../stores.js";
  _API_STORE_WEBSITE_.subscribe((value) => {
    website = value;
  });
</script>

<svelte:head>
  <title>{website.siteName}</title>
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
  <link rel="apple-touch-icon" href={base + "/logo_og.jpg"} />
  <!-- <link rel="manifest" href={base+"/manifest.json"} /> -->

  <!--  Essential META Tags -->
  <meta property="og:title" content={website.siteDescription} />
  <meta property="og:type" content="website" />
  <meta property="og:image" content={website.siteLogo} />
  <meta property="og:url" content={website.siteUrl} />
  <meta name="twitter:card" content="summary_large_image" />

  <!--  Non-Essential, But Recommended -->
  <meta property="og:description" content={website.siteDescription} />
  <meta property="og:site_name" content={website.siteName} />
  <meta name="twitter:image:alt" content={website.siteDescription} />

  <!--  Non-Essential, But Required for Analytics -->
  <meta property="fb:app_id" content="your_app_id" />
  <meta name="twitter:site" content={website.siteContactTwitter} />
  <meta name="instagram:site" content={website.siteContactInstagram} />
  <meta name="facebook:site" content={website.siteContactFacebook} />
</svelte:head>
<header class="top-bar">
  <Contact align="center" />
</header>

<style type="text/scss">
  header {
    overflow-y: hidden;
    overflow-x: hidden;
    max-height: 52px;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: #222222;
    box-sizing: border-box;
    display: block;
    background: transparent;
    color: red;
    line-height: 49px;
    position: relative;
  }
</style>
