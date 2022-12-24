<script>
	import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
	import IconButton, { Icon } from "@smui/icon-button";
	import Textfield from "@smui/textfield";
	import Input from "../Input.svelte";
	let panel3Open = false;
	panel3Open =
		localStorage.getObject("--panel--panel3Open") === "true" || false;
	$: google = {};
	import { _API_STORE_GOOGLE_ } from "../../stores.js";
	_API_STORE_GOOGLE_.subscribe((value) => {
		google = value || {};
	});
	//
	const unsavedAreYouSureChanges = () => {
		if (confirm("are you sure you want to change this?")) {
			unsavedChanges();
		} else {
			getLatestDataFromLocalStorage();
		}
	};
	export let unsavedChanges;
</script>

<Accordion>
	<Panel
		bind:open={panel3Open}
		on:click={(e) => {
			localStorage.setItem("--panel--panel3Open", panel3Open);
		}}
	>
		<Header>
			<strong class="mdc-typography--headline6">Google</strong>
			<span slot="description">Google Account Settings</span>
			<IconButton slot="icon" toggle pressed={panel3Open}>
				<Icon class="material-icons" on>expand_less</Icon>
				<Icon class="material-icons">expand_more</Icon>
			</IconButton>
		</Header>
		<Content>
			<Input
				label="Calendar ICS"
				class="w-100"
				bind:value={google.calendarUrl}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				label="Calendar Redirect"
				class="w-100"
				bind:value={google.calendarRedirect}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				label="Places API Id"
				class="w-100"
				bind:value={google.placeId}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				label="Map API Id"
				class="w-100"
				bind:value={google.mapId}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				label="Map API Url"
				class="w-100"
				bind:value={google.mapUrl}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				label="Google Tag Id"
				class="w-100"
				bind:value={google.tagId}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
		</Content>
	</Panel>
</Accordion>
