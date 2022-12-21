<script>
	import { onMount } from "svelte";
	import {
		msalConfig,
		apiConfig,
		loginRequest,
		tokenRequest,
	} from "../config.js";
	import { _API_STORE_ACCOUNT_ } from "../stores.js";

	let username = "";
	let myMSALObj = null;
	export let localAccountHasAdminPermissions = false;

	//
	export let onSuccess = (handleSuccess) => {
		handleSuccess();
	};

	/**/
	onMount(() => {
		if (localAccountHasAdminPermissions != false) return;

		try {
			myMSALObj = new msal.PublicClientApplication(msalConfig);
		} catch (err) {
			localStorage.setItem("msal auth", JSON.stringify(err));

			if (myMSALObj === null) {
				console.error("myMSALObj is null", myMSALObj);
				return;
			} else {
				console.log("myMSALObj is not null");
			}
		}

		/**
		 * A promise handler needs to be registered for handling the
		 * response returned from redirect flow.
		 */
		myMSALObj
			.handleRedirectPromise()
			.then(handleResponse)
			.catch((error) => {
				localStorage.setItem(
					"msal handleRedirectPromise",
					JSON.stringify(error)
				);
			});

		/**
		 * See here for more info on account retrieval:
		 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
		 */
		async function selectAccount() {
			const currentAccounts = await myMSALObj.getAllAccounts();

			if (!currentAccounts || currentAccounts.length < 1) {
				localStorage.setItem(
					"msal signIn",
					JSON.stringify(
						"!currentAccounts || currentAccounts.length < 1"
					)
				);
				signIn();
				return;
			} else if (currentAccounts.length > 1) {
				// Add your account choosing logic here
				console.warn("msal multiple accounts detected.");
				localStorage.setItem(
					"msal signIn",
					JSON.stringify("msal multiple accounts detected.")
				);
				onSuccess(querySiteSpecificData);
			} else if (currentAccounts.length === 1) {
				localStorage.setItem("msal signIn", JSON.stringify("success"));
				onSuccess(querySiteSpecificData);
			}
		}

		async function querySiteSpecificData() {
			// const rWebsite = await fetch("data/website.json");
			// const rWebsiteItems = await (await rWebsite.json())
			// localStorage.setItem('--data-website', JSON.stringify(rWebsiteItems));
			// const rProductList = await fetch("data/products.json");
			// const rProductListItems = await (await rProductList.json()).beers;
			// localStorage.setItem('--data-products', JSON.stringify(rProductListItems));
			// const rGoogle = await fetch("data/google.json");
			// const rGoogleItems = await (await rGoogle.json())
			// localStorage.setItem('--data-google', JSON.stringify(rGoogleItems));
		}

		/**
		 * To see the full list of response object properties, visit:
		 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#response
		 */
		function handleResponse(response) {
			//localStorage.setItem('err: response', JSON.stringify(response));

			if (response !== null) {
				_API_STORE_ACCOUNT_.set(response.account);
				localStorage.setObject("accounts", response.account, 24 * 60);
				//localStorage.setObject('accounts', JSON.stringify(response.account), 24 * 60);
				selectAccount();
			} else {
				selectAccount();

				/**
				 * If you already have a session that exists with the authentication server, you can use the ssoSilent() API
				 * to make request for tokens without interaction, by providing a "login_hint" property. To try this, comment the
				 * line above and uncomment the section below.
				 */

				// myMSALObj.ssoSilent(silentRequest).
				//     then(() => {
				//         const currentAccounts = myMSALObj.getAllAccounts();
				//         username = currentAccounts[0].username;
				//         welcomeUser(username);
				//         updateTable();
				//     }).catch(error => {
				//         console.error("Silent Error: " + error);
				//         if (error instanceof msal.InteractionRequiredAuthError) {
				//             signIn();
				//         }
				//     });
			}
		}

		/**
		 * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
		 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
		 */
		function signIn() {
			myMSALObj.loginRedirect(loginRequest);
		}

		window.signIn = signIn;

		/**
		 * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
		 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
		 */
		function signOut() {
			// Choose which account to logout from by passing a username.
			const logoutRequest = {
				account: myMSALObj.getAccountByUsername(username),
			};
			myMSALObj.logout(logoutRequest);
		}

		window.signOut = signOut;

		/**
		 * See here for more info on account retrieval:
		 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
		 */

		function getTokenRedirect(request) {
			request.account = myMSALObj.getAccountByUsername(username);

			return myMSALObj.acquireTokenSilent(request).catch((error) => {
				console.warn(
					"silent token acquisition fails. acquiring token using redirect"
				);
				if (error instanceof msal.InteractionRequiredAuthError) {
					// fallback to interaction when silent call fails
					return myMSALObj.acquireTokenRedirect(request);
				} else {
					console.warn(error);
				}
			});
		}

		// Acquires and access token and then passes it to the API call
		function passTokenToApi() {
			getTokenRedirect(tokenRequest)
				.then((response) => {
					callApiWithToken(apiConfig.endpoint, response.accessToken);
				})
				.catch((error) => {
					console.error(error);
				});
		}

		selectAccount();
	});
</script>
