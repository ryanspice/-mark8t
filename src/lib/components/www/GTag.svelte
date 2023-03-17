<script>
import { fetchJSONP } from "../../utils/fetchJSONP.js";
import { onMount } from "svelte";

let initialized = false;
let gtagId = import.meta.env.VITE_API_G_ANALYTICS_ID;
let gtagUrl = "https://www.googletagmanager.com/gtag/js?id=" + gtagId;

const init = async () => {
	await fetchJSONP(gtagUrl);
	initialized = true;
};

onMount(async () => {
	await init();
	
	window.dataLayer = window.dataLayer || [];
	function gtag() { dataLayer.push(arguments); }
	gtag('js', new Date());

	gtag('config',gtagId);

		console.log("gtag","page_view", {
			'page_title': document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
		});
		gtag('event', 'page_view', {
			'page_title': document.title,
			'page_location': window.location.href,
			'page_path': window.location.pathname
		});

});
</script>
