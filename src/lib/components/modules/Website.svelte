<script>
	import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
	import IconButton, { Icon } from "@smui/icon-button";
	import Textfield from "@smui/textfield";
	import Input from "../Input.svelte";
	let panelWebsite = false;
	panelWebsite =
		localStorage.getItem("--panel--panelWebsite") === "true" || false;
	$: website = {};
	import { _API_STORE_WEBSITE_ } from "../../stores.js";
	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value || {};
	});
	let data = {};
	const standardFields = {
		// 'siteAddress': '',
		siteName: "Site Name",
		siteDescription: "Site Description",
		siteKeywords: "Site Keywords",
		// 'siteLogo': '',
		// 'siteFavicon': '',
		// 'siteUrl': '',
		// 'siteContact': '',
		// 'siteContactPhone': '',
		// 'siteContactEmail': '',
	};
	export let unsavedChanges;
</script>

<Accordion>
	<Panel
		bind:open={panelWebsite}
		on:click={(e) => {
			localStorage.setItem("--panel--panelWebsite", panelWebsite);
		}}
	>
		<Header>
			<strong class="mdc-typography--headline6">Website</strong>
			<IconButton slot="icon" toggle pressed={panelWebsite}>
				<Icon class="material-icons" on>expand_less</Icon>
				<Icon class="material-icons">expand_more</Icon>
			</IconButton>
		</Header>
		<Content class="mdc-typography--body2">
			{#each Object.entries(standardFields) as [key, value]}
				<Input
					bind:value={website[key]}
					label={value}
					input={unsavedChanges}
				/>
			{/each}
		</Content>
	</Panel>
</Accordion>
