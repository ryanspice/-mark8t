<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";

	import {
		Authenticate,
		Analytics,
		Spinner,
		Layout,
		_API_STORE_WEBSITE_,
	} from "../index";

	let reconnectionAttempts = 0;
	let localAccount = {};
	let localAccountId = "";
	let localAccountName;
	let localAccountPermissions;
	let localAccountHasAdminPermissions = false;

	$: website = {};

	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value || {};
	});

	/* intercept secret code from local storage */
	const interceptSecret = () => {
		// TODO : implememnt API for secret codes and permissions for users based on click funnel
		if (
			localStorage.getObject("--secret") ===
			JSON.parse(Storage.prototype.decode("IlBFT04i"))
		) {
			localAccountHasAdminPermissions = true;
		}
	};

	/* set variables from local storage
	 * get account data and if data exists
	 * else signIn then;
	 * get permissions
	 * skip if user has secret code in local storage
	 * else fetch permissions from mark8t.ca/storage/{tenant}/auth.users.json
	 */
	const retrieveLocaldata = async () => {
		console.log(
			"retrieveLocaldata - " + (await localStorage.getObject("--secret"))
		);

		interceptSecret();

		let account = localStorage.getObject("accounts", window.signIn);
		localAccount = account;
		localAccountId = account?.localAccountId || null;
		localAccountName = account?.name;

		if (
			localAccountName &&
			localAccountId &&
			!localAccountHasAdminPermissions
		) {
			localAccountPermissions = await (
				await fetch("../api/authenticated.json")
			).json();
			localAccountHasAdminPermissions =
				localAccountPermissions.ids.includes(localAccountId);
		}
	};

	/**/
	const retrieveTimeout = () => {
		console.log(localAccountHasAdminPermissions);
		if (reconnectionAttempts++ > 2) {
			if (localAccountHasAdminPermissions) {
				window.location = base + "/admin";
			} else {
				window.location = base + "/unauthorized";
			}
		} else {
			if (!localAccountHasAdminPermissions) {
				retrieveTimeout();
			}
		}
	};

	/**/
	onMount(() => {
		retrieveLocaldata();
		if (!localAccountHasAdminPermissions) {
			console.log("Admin - user has no permissions");
			setTimeout(retrieveTimeout, 1000);
		} else {
			console.log("Admin - user has admin permissions");
		}
	});
	export let override = false;
	export let data = {};
</script>

<svelte:head>
	<title>{website.siteName || ""}</title>
</svelte:head>

<!-- <Drawer /> -->
<Analytics />
{#if localAccountId}
	{#if localAccountHasAdminPermissions}
		<Layout {override} account={localAccount}>
			<slot />
		</Layout>

		<!-- <div class="submenu">
			{#each data?.sections as section}
				<a href="/dev/admin/{section.slug}">{section.title}</a>
			{/each}
		</div> -->
	{:else if reconnectionAttempts < 2}
		<Spinner message={"checking permissions"} />
	{:else}
		<Spinner message={"redirecting"} />
	{/if}
{:else}
	<Spinner />
	<Authenticate
		localAccountHasAdminPermissions={localAccountPermissions}
		onSuccess={async (more) => {
			await more();
			await retrieveLocaldata();
		}}
	/>
{/if}
