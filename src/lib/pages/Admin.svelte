<script>
	import { base } from '$app/paths';
	import { onMount } from "svelte";

	import {
		Authenticate,
		Analytics,
		Spinner,
		Layout,
	
	_API_STORE_WEBSITE_
} from "../index";

	let reconnectionAttempts = 0;
	let localAccount = {};
	let localAccountId = "";
	let localAccountName;
	let localAccountPermissions;
	let localAccountHasAdminPermissions = false;

	$: website = {};

	_API_STORE_WEBSITE_.subscribe(value => {
		website = value || {};
	});

	/* set variables from local storage */
	const retrieveLocaldata = async () => {
		console.log('retrieveLocaldata');
		let account = (localStorage.getObject('accounts', window.signIn));
		localAccount = account;
		localAccountId = account?.localAccountId || null;
		localAccountName = account?.name;
		if ((localAccountName) && (localAccountId)) {
			localAccountPermissions = await (await fetch("../api/authenticated.json")).json();
			localAccountHasAdminPermissions = localAccountPermissions.ids.includes(localAccountId);
		}
	};

	/**/
	const retrieveTimeout = () => {
		console.log(localAccountHasAdminPermissions)
		if (reconnectionAttempts++ > 2) {
			if (localAccountHasAdminPermissions) {
				//alert('eh')
			} else {
				window.location = base + "/unauthorized";
			}
		} else {
			if (!localAccountHasAdminPermissions) {
				retrieveTimeout();
			}
		}
	}

	/**/
	onMount(() => {
		retrieveLocaldata();
		if (!localAccountHasAdminPermissions) {
			setTimeout(retrieveTimeout, 1000);
		} else {
			console.log('user has admin permissions');
		}
	});
</script>

<svelte:head>
	<title>{website.siteName || ''}</title>
</svelte:head>

<!-- <Drawer /> -->
<Analytics />
{#if (localAccountId)}
{#if (localAccountHasAdminPermissions)}
<Layout account={localAccount}></Layout>
{:else if ((reconnectionAttempts
<2))} <Spinner message={"checking permissions"} />
{:else}
<Spinner message={"redirecting"} />
{/if}
{:else}
<Spinner />
<Authenticate localAccountHasAdminPermissions={localAccountPermissions} onSuccess={async (more)=>{
	await more();
	await retrieveLocaldata();
	}} />
	{/if}