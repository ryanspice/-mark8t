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

	import { fetchSecretsFromJson } from "../stores.js";

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
	const interceptSecret = async () => {
		console.log(
			"retrieveLocaldata - " + (await localStorage.getObject("--secret"))
		);

		await fetchSecretsFromJson((data) => {
			data?.forEach((secret) => {
				if (
					localStorage.getObject("--secret") ===
					JSON.parse(Storage.prototype.decode(secret))
				) {
					console.log(
						"Admin.svelte :: interceptSecret - secretList - ",
						data
					);
					localAccountHasAdminPermissions = true;

					// Add user id to authenticated.json via post
					// fetch("https://mark8t.ca/storage/tenant/authenticated.json", {
					// 	method: "POST",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	body: JSON.stringify({
					// 		ids: [localAccountId],
					// 	}),
					// });

					// Add user id to authenticated.json via put
					// fetch("https://mark8t.ca/storage/tenant/authenticated.json", {
					// 	method: "PUT",
					// 	headers: {
					// 		"Content-Type": "application/json",
					// 	},
					// 	body: JSON.stringify({
					// 		ids: [localAccountId],
					// 	}),
					// });
				}
			});
		});
		// console.log("interceptSecret - secretList - ", secretList, data);
		// TODO : implememnt API for secret codes and permissions for users based on click funnel
		// if (
		// 	localStorage.getObject("--secret") ===
		// 	JSON.parse(Storage.prototype.decode("IlBFT04i"))
		// ) {
		// 	localAccountHasAdminPermissions = true;
		// }
	};

	/* set variables from local storage
	 * get account data and if data exists
	 * else signIn then;
	 * get permissions
	 * skip if user has secret code in local storage
	 * else fetch permissions from mark8t.ca/storage/{tenant}/auth.users.json
	 */
	const retrieveLocaldata = async () => {
		await interceptSecret();

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
