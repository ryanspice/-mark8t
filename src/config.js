
// build redirect url from environment variables
const redirectUrl = import.meta.env.VITE_REDIRECT_URL;
// scopes 
const scopes = ["https://graph.microsoft.com/User.Read.All", "https://graph.microsoft.com/AppRoleAssignment.ReadWrite.All", "https://graph.microsoft.com/AppRoleAssignment.ReadWrite.All", "openid", "email", "offline_access", "profile"];
const tenantName = `tracercanada`;

// Add here the endpoints for services you would like to use.
const apiConfig = {
	endpoint: "https://dev.azure.com/msaltestingjs/_apis/projects?api-version=4.0",
	scopes: ["499b84ac-1321-427f-aa17-267ca6975798/.default"] // do not change this value
};

// build msal config
const msalConfig = {
	redirect_uri: redirectUrl,// + "index",
	auth: {
		//tenant:'common',
		azureAD: `${tenantName}.onmicrosoft.com`,
		clientId: `5ac16849-77f9-4b75-ad57-90c114601daf`,
		response_type: "id_token code token",
		responseType: "id_token code token",
		responseMode: "query",
		"code_challenge_method": "false",
		authorityDomain: `${tenantName}.b2clogin.com`,
		authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/B2C_1_susi`,
		validateAuthority: false,
		knownAuthorities: ["tracercanada.b2clogin.com"],
		redirectUri: redirectUrl,// + "/admin",
		postLogoutRedirectUri: redirectUrl + "/logout",
		scopes: scopes,
		navigateToLoginRequestUrl: false,
		extraQueryParameters: { domain_hint: 'organizations' },
		"claims":
		{

			"userinfo":
			{
				"given_name": { "essential": true },
				"nickname": null,
				"email": { "essential": true },
				"email_verified": { "essential": true },
				"picture": null,
				"role": { "essential": true },
			},
			"id_token":
			{
				"gender": null,
				"birthdate": { "essential": true },
			}
		}
	},
	cache: {
		cacheLocation: "localStorage",
		storeAuthStateInCookie: false,
	},
	system: {
		windowHashTimeout: 60000,
		iframeHashTimeout: 6000,
		loadFrameTimeout: 0,
		loggerOptions: {
			loggerCallback: (level, message, containsPii) => {
				if (containsPii) {
					return;
				}
				switch (level) {
					case msal.LogLevel.Error:
						console.error(message);
						return;
					case msal.LogLevel.Info:
						console.info(message);
						return;
					case msal.LogLevel.Verbose:
						console.debug(message);
						return;
					case msal.LogLevel.Warning:
						console.warn(message);
						return;
				}
			}
		}
	},
};

/**
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
const loginRequest = {
	scopes: [...msalConfig.auth.scopes],
	extraQueryParameters: msalConfig.auth.extraQueryParameters,
}

/**
 * Add here the scopes to request when obtaining an access token for a web API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
const tokenRequest = {
	scopes: apiConfig.scopes,
	forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};

export {
	loginRequest,
	tokenRequest,
	msalConfig,
	apiConfig,
	tenantName,
	redirectUrl,
	scopes
};