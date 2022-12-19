<script>
	import { onMount } from "svelte";
	import ExternalLink from "../header/banner/ExternalLink.svelte";
	let enabledEmail = true;
	export let lblEmail = "rob@dundasandsons.com";
	onMount(() => {
	});
</script>
{#if (enabledEmail)}
<li>
	<ExternalLink href={"mailto:"+lblEmail} icon="email" label={lblEmail} alt="Send Email" />
</li>
{/if}