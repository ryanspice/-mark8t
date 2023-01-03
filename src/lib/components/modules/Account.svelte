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
	import { onMount } from "svelte";
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
	export let overrideOpenState = false;

	onMount(() => {
		if (overrideOpenState) panelInfo = true;
	});
</script>

<Panel
	bind:open={panelInfo}
	on:click={(e) => {
		localStorage.setObject("--panel--panelInfo", panelInfo);
	}}
>
	<Header style="cursor:pointer;">
		<strong class="mdc-typography--headline6">Acccount</strong>
		<IconButton
			slot="icon"
			toggle
			pressed={panelInfo}
			hidden={overrideOpenState}
		>
			<Icon class="material-icons" on>expand_less</Icon>
			<Icon class="material-icons">expand_more</Icon>
		</IconButton>
	</Header>
	<Content>
		<Input label="Name" bind:value={account.name} disabled={true} />
		<Input label="Username" bind:value={account.username} disabled={true} />
		<Input label="Tenant" bind:value={website.siteName} disabled={true} />
		<Input
			label="Tenant ID"
			bind:value={account.localAccountId}
			disabled={true}
		/>
	</Content>
</Panel>
