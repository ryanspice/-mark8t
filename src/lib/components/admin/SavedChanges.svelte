<script>
	import Button, { Label } from "@smui/button";
	import Banner, { CloseReason } from "@smui/banner";
	import IconButton, { Icon } from "@smui/icon-button";
	export let handleBannerClosed = () => {};
	export let onDiscard = () => {};
	export let onSave = () => {};
	export let open = false;
	export let centered = false;
	export let mobileStacked = false;

	let scrollPosition;
	$: () => {
		document.getElementById(
			"saved-changes"
		).style = `position:absolute;top: ${scrollPosition}px;`;
	};
</script>

<svelte:window bind:scrollY={scrollPosition} />
<div id="saved-changes" class="top-app-bar-container">
	<Banner
		bind:open
		bind:centered
		bind:mobileStacked
		on:SMUIBanner:closed={handleBannerClosed}
	>
		<Icon slot="icon" class="material-icons">priority_high</Icon>
		<Label slot="label"
			>There are unsaved changes.
			<Button secondary on:click={onDiscard}>Discard</Button>
			<Button secondary on:click={onSave}>Save</Button>
		</Label>
	</Banner>
</div>

<style>
	#saved-changes {
		position: fixed;
		width: 100%;
		top: 0px;
		z-index: 1;
	}
</style>
