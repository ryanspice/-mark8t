<script>
	import Card from "@smui/card";
	import IconButton, { Icon } from "@smui/icon-button";

	import ExternalLink from "../header/banner/ExternalLink.svelte";

	let modules = ["account_box", "layers"];
</script>

<Card class="smui-card--outlined w-100">
	<div class="smui-card__content">
		<a href="./admin/account" class="smui-card__action floatLeft">
			<li style="float:left;color:black;">
				<IconButton class="material-icons">add</IconButton>
			</li>
		</a>
		<!-- array of smui icons with a preceeding plus sign -->
		{#each modules as module}
			<div style="display: flex; align-items: center; float:left;">
				<IconButton class="material-icons" touch>{module}</IconButton>
			</div>
		{/each}
	</div>
</Card>
