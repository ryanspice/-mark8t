<script>
	import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
	import IconButton, { Icon } from "@smui/icon-button";
	import Textfield from "@smui/textfield";
	import Input from "../Input.svelte";
	let panelInfo = false;
	let panelContactInfo = false;
	panelInfo = localStorage.getObject("--panel--panelInfo");
	panelContactInfo = localStorage.getObject("--panel--panelContactInfo");
	$: account = {};
	$: website = {};
	import { _API_STORE_ACCOUNT_, _API_STORE_WEBSITE_ } from "../../stores.js";
	_API_STORE_ACCOUNT_.subscribe((value) => {
		account = value || {};
	});
	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value || {};
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

<!-- CONTACT INFO -->
<Panel
	bind:open={panelContactInfo}
	on:click={(e) => {
		localStorage.setObject("--panel--panelContactInfo", panelContactInfo);
	}}
>
	<Header>
		<strong class="mdc-typography--headline6">Contact & Social</strong>
		<span slot="description" />
		<IconButton slot="icon" toggle pressed={panelContactInfo}>
			<Icon class="material-icons" on>expand_less</Icon>
			<Icon class="material-icons">expand_more</Icon>
		</IconButton>
	</Header>
	<Content>
		<Input
			label="Phone"
			class="w-100"
			type="tel"
			pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
			maxlength="17"
			bind:value={website.siteContactPhone}
			input={unsavedChanges}
		/>
		<Input
			label="Email"
			class="w-100"
			bind:value={website.siteContactEmail}
			input={unsavedChanges}
		/>
		<Input
			label="Facebook"
			class="w-100"
			bind:value={website.siteContactFacebook}
			input={unsavedChanges}
		/>
		<Input
			label="Instagram"
			class="w-100"
			bind:value={website.siteContactInstagram}
			input={unsavedChanges}
		/>
	</Content>
</Panel>
