<script>
	import { onMount } from "svelte";

	let timelineData;
	let error;

	onMount(async () => {
		try {
			// Step 2: Load the library
			await loadScript("https://apis.google.com/js/platform.js");

			// Step 3: Authorize the user.
			const CLIENT_ID = "G-PVD26KBEQR";
			gapi.analytics.auth.authorize({
				container: "auth-button",
				clientid: CLIENT_ID,
			});

			// Step 4: Create the view selector.
			const viewSelector = new gapi.analytics.ViewSelector({
				container: "view-selector",
			});

			// Step 5: Create the timeline chart
			const timeline = new gapi.analytics.googleCharts.DataChart({
				reportType: "ga",
				query: {
					dimensions: "ga:date",
					metrics: "ga:sessions",
					"start-date": "30daysAgo",
					"end-date": "yesterday",
				},
				chart: {
					type: "LINE",
					container: "timeline",
				},
			});

			// Step 6: Hook up the components to work together.
			gapi.analytics.auth.on("success", function (response) {
				viewSelector.execute();
			});

			viewSelector.on("change", function (ids) {
				const newIds = {
					query: {
						ids: ids,
					},
				};
				timeline.set(newIds).execute();
			});
		} catch (err) {
			error = err;
		}
	});

	function loadScript(url) {
		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = url;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}
</script>

{#if error}
	<p>An error occurred: {error}</p>
{:else}
	<section id="auth-button" />
	<section id="view-selector" />
	<section id="timeline" />
{/if}
