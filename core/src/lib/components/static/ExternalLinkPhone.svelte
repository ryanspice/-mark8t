<script>
	import { onMount } from "svelte";
	import ExternalLink from "../header/banner/ExternalLink.svelte";
	let enabledPhone = true;
	export let lblPhone = "(519) 601-6151";
	onMount(() => {
	});
</script>
{#if (enabledPhone)}
<li>
	<ExternalLink href={"tel:"+lblPhone} icon="phone" label={lblPhone} alt="Make a Call" />
</li>
{/if}