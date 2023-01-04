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
	let currentAccounts = [];

	export let localAccountHasAdminPermissions = false;

	export let onSuccess = (handleSuccess) => {
		handleSuccess();
	};

	/* Handle all MSAL Authenticate Logic */
	const authenticate = async () => {

		console.log(
			"Authenticate - localAccountHasAdminPermissions - " +
			localAccountHasAdminPermissions
		);

		if (localAccountHasAdminPermissions != false) {
			return;
		}

		/** 
		 * Attempt to resolve a new instance of MSAL
		 * If MSAL fails to resolve, log the error and return 
		 */
		try {
			myMSALObj = await new msal.PublicClientApplication(msalConfig);
			console.log("Authenticate - myMSALObj - success");
		} catch (err) {

			console.error("Authenticate - myMSALObj - ", err);
			localStorage.setItem("msal auth", JSON.stringify(err));

			if (myMSALObj === null) {
				console.warn("Authenticate - myMSALObj - is null", myMSALObj);
				return;
			} else {
				console.warn("Authenticate - myMSALObj - is not null");
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
		 * Attempt to resolve the current user account
		 */
		async function selectAccount() {
			currentAccounts = await myMSALObj.getAllAccounts();
			let msg = "";
			console.log(
				"Authenticate - selectAccount - ",
				currentAccounts.length
			);

			if (currentAccounts.length === 0) {
				msg = "currentAccounts.length===0";
				localStorage.setItem("msal signIn", JSON.stringify(msg));
				console.log("Authenticate - selectAccount - " + msg);
				//signIn();
			}

			if (currentAccounts.length < 1) {
				msg = "!currentAccounts || currentAccounts.length < 1";
				localStorage.setItem("msal signIn", JSON.stringify(msg));

				console.log("Authenticate - selectAccount - " + msg);

				return;
			} else if (currentAccounts.length > 1) {
				// Add your account choosing logic here
				msg = "msal multiple accounts detected.";
				localStorage.setItem("msal signIn", JSON.stringify(msg));

				console.log("Authenticate - selectAccount - " + msg);

				onSuccess(querySiteSpecificData);
			} else if (currentAccounts.length === 1) {
				msg = "success";
				localStorage.setItem("msal signIn", JSON.stringify(msg));
				console.log("Authenticate - selectAccount - " + msg);
				onSuccess(querySiteSpecificData);
			}
		}

		// UNUSED

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
			if (response !== null) {
				_API_STORE_ACCOUNT_.set(response.account);
				localStorage.setObject("accounts", response.account, 24 * 60);
				//localStorage.setObject('accounts', JSON.stringify(response.account), 24 * 60);
				selectAccount();
			} else {
				selectAccount();
			}
		}

		/**
		 * You can pass a custom request object below. This will override the initial configuration. For more information, visit:
		 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#request
		 */
		function signIn() {
			let account = localStorage.getObject("accounts");
			console.log(account);

			if (account) {
				// verify account data
				if (
					account.homeAccountId &&
					account.localAccountId &&
					account.username
				) {
					// account is valid
					console.log("Authenticate - signIn - account is valid");
					const timeToLive =
						new Date(
							Number(String(account.idTokenClaims.exp) + "000")
						) - new Date().getTime();

					if (
						timeToLive > 0 &&
						timeToLive < 1000 * 60 * 60 * 24 * 30
					) {
						console.log(
							"Authenticate - signIn - account is valid - token is valid"
						);
						console.log(
							"Authenticate - signIn - time to live",
							timeToLive
						);
						return;
					}
				}
			}

			console.log("Authenticate - signIn - ", currentAccounts);
			if (currentAccounts.length > 0) {
				localStorage.setObject(
					"--accountId",
					currentAccounts[0],
					24 * 60
				);
				console.log("Authenticate - signIn - currentAccounts.length>0");
				return;
			}
			// myMSALObj
			// 	.loginPopup(loginRequest)
			// 	.then(handleResponse)
			// 	.catch((error) => {
			// 		console.error(error);
			// 	});
			myMSALObj.loginRedirect(loginRequest);
		}

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

		/**
		 * expose functions to the global scope
		 */
		window.signIn = signIn;
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

	}

	/**/
	onMount(authenticate);
</script>