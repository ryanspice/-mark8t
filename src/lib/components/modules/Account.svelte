<script>
	import Accordion, { Panel, Header, Content } from "@smui-extra/accordion";
	import IconButton, { Icon } from "@smui/icon-button";
	import Textfield from "@smui/textfield";
	import Input from "../Input.svelte";
	let panelInfo = false;
	let panelContactInfo = false;
	panelInfo =
		localStorage.getObject("--panel--panelInfo") === "true" || false;
	panelContactInfo =
		localStorage.getObject("--panel--panelContactInfo") === "true" || false;
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

<Accordion>
	<Panel
		bind:open={panelInfo}
		on:click={(e) => {
			localStorage.setItem("--panel--panelInfo", panelInfo);
		}}
	>
		<Header>
			<strong class="mdc-typography--headline6">Acccount</strong>
			<IconButton slot="icon" toggle pressed={panelInfo}>
				<Icon class="material-icons" on>expand_less</Icon>
				<Icon class="material-icons">expand_more</Icon>
			</IconButton>
		</Header>
		<Content>
			<Input label="Name" bind:value={account.name} disabled={true} />
			<Input
				label="Username"
				bind:value={account.username}
				disabled={true}
			/>
			<Input
				label="Tenant"
				bind:value={website.siteName}
				disabled={true}
			/>
			<Input
				label="Tenant ID"
				bind:value={account.localAccountId}
				disabled={true}
			/>
		</Content>
	</Panel>
</Accordion>
<!-- CONTACT INFO -->
<Accordion>
	<Panel
		bind:open={panelContactInfo}
		on:click={(e) => {
			localStorage.setItem("--panel--panelContactInfo", panelContactInfo);
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
</Accordion>
