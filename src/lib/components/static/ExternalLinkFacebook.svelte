<script>
	import { onMount } from "svelte";
	import ExternalLink from "../header/banner/ExternalLink.svelte";
	let enabledFacebook = true;
	export let label;
	export let link = "https://www.facebook.com/DundasandSons/";
	onMount(() => {
	});
</script>
{#if (enabledFacebook)}
<li>
	<ExternalLink href={link} label={label||null} icon="facebook" alt="Facebook"
		style="top:5px;left:1px;transform: scale(1.35);" />
</li>
{/if}