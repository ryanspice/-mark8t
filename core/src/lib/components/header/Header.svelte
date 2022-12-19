<style type="text/scss">
  header {
    overflow-y: hidden;
    overflow-x:hidden;
    max-height: 52px;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    color: #222222;
    box-sizing: border-box;
    display: block;
    background:transparent;
    color:red;
    line-height: 49px;
    position: relative;
  } 
</style>
<script>
  import { base } from '$app/paths';
  import Contact from './Contact.svelte';
  export let seoTitle = "Dundas and Sons";
  export let seoContent = "Dundas and Sons";
</script>
<svelte:head>
  <title>{seoTitle}</title>
  <meta name="description" content={seoContent} />
  <link href="/" rel="canonical" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#00024D" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content={seoContent} />
  <link rel="apple-touch-icon" href={base+"/logo_red.jpg"} />
  <!-- <link rel="manifest" href={base+"/manifest.json"} /> -->
  <link rel="icon" type="image/png" href={base+"/logo_red.jpg"} sizes="192x192" />
</svelte:head>
<header class="top-bar">
  <Contact />
</header>