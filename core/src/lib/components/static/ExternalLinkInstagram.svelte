<script>
	import { base } from '$app/paths';
	import { onMount } from "svelte";
	import ExternalLink from "../header/banner/ExternalLink.svelte";
	let enabledFacebook = true;
	export let label;
	export let link = "https://www.instagram.com/dundasandsonsbrewing/";
	onMount(() => {
	});
</script>
<style>
	.instagram {
		width: 24px;
		position: relative;
		left: 2px;
		filter: saturate(21) hue-rotate(100deg);
	}
</style>
{#if (enabledFacebook)}
<li>
	<ExternalLink href={link} label={label||null} icon="" alt="@dundasandsonsbrewing">
		<img class="instagram" src={base + "/ico_instagram.png" } alt="instagram" />
	</ExternalLink>
</li>
{/if}