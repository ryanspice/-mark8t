<script>
	import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
	import IconButton, { Icon } from "@smui/icon-button";
	import Textfield from "@smui/textfield";
	import Input from "../Input.svelte";
	let panel3Open = localStorage.getObject("--panel--panel3Open");
	let panelFacebook = localStorage.getObject("--panel--panelFacebook");
	let panelSecrets = localStorage.getObject("--panel--panelSecrets");
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
	<p>
		<strong>API Keys</strong>
		<small
			>This page allows you to manage and configure the different Google
			services that are integrated with our B2B2C app. <br /> You can
			create or edit API keys for services like Google Maps, YouTube, and
			Google Drive.
			<br /> <br />
			You can also access a Google Calendar directly from the app to schedule
			and manage events. Plus, you can use your Google Tag ID to track and
			analyze user behavior on the app using Google Analytics.
		</small>
	</p>
	<Panel
		bind:open={panel3Open}
		on:click={(e) => {
			localStorage.setObject("--panel--panel3Open", panel3Open);
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
				type="password"
				label="Calendar ICS"
				class="w-100"
				bind:value={google.calendarUrl}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				type="password"
				label="Calendar Redirect"
				class="w-100"
				bind:value={google.calendarRedirect}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				type="password"
				label="Places API Id"
				class="w-100"
				bind:value={google.placeId}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				type="password"
				label="Map API Id"
				class="w-100"
				bind:value={google.mapId}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				type="password"
				label="Map API Url"
				class="w-100"
				bind:value={google.mapUrl}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
			<Input
				type="password"
				label="Google Tag Id"
				class="w-100"
				bind:value={google.tagId}
				enter={unsavedAreYouSureChanges}
				input={unsavedChanges}
			/>
		</Content>
	</Panel>

	<!-- Facebook -->

	<Panel
		bind:open={panelFacebook}
		on:click={(e) => {
			localStorage.setObject("--panel--panelFacebook", panelFacebook);
		}}
	>
		<Header>
			<strong class="mdc-typography--headline6">Facebook</strong>
			<span slot="description">Facebook Account Settings</span>
			<IconButton slot="icon" toggle pressed={panelFacebook}>
				<Icon class="material-icons" on>expand_less</Icon>
				<Icon class="material-icons">expand_more</Icon>
			</IconButton>
		</Header>
		<Content />
	</Panel>

	<!-- Secret Keys -->

	<Panel
		bind:open={panelSecrets}
		on:click={(e) => {
			localStorage.setObject("--panel--panelSecrets", panelSecrets);
		}}
	>
		<Header>
			<strong class="mdc-typography--headline6">Secrets</strong>
			<span slot="description">Secrets Account Settings</span>
			<IconButton slot="icon" toggle pressed={panelSecrets}>
				<Icon class="material-icons" on>expand_less</Icon>
				<Icon class="material-icons">expand_more</Icon>
			</IconButton>
		</Header>
		<Content />
	</Panel>
</Accordion>
