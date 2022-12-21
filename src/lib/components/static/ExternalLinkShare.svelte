<script>
	import ExternalLink from "../header/banner/ExternalLink.svelte";
	let enabledShare = true;

	$: website = {};
	import {
		_API_STORE_WEBSITE_,
		fetchWebsiteInfoFromJson,
	} from "../../../stores.js";
	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value;
	});

	fetchWebsiteInfoFromJson();

	export let lblShare = "share";
	//trigger native share
	function handleShareButton(event) {
		try {
			if (navigator.share !== undefined) {
				navigator.share({
					title: website.siteName,
					text:
						website.siteName +
						" " +
						website.siteAddress +
						" " +
						website.siteContactEmail +
						" " +
						website.siteContactPhone,
					url: website.siteUrl,
				});
			}
		} catch (e) {
			console.alert("Share failed, copied to clipboard instead: " + e);
			navigator.clipboard.writeText(
				website.siteName +
					" " +
					website.siteAddress +
					" " +
					website.siteContactEmail +
					" " +
					website.siteContactPhone
			);
		}
		event.preventDefault();
		event.stopPropagation();
	}
</script>

{#if enabledShare}
	<li>
		<ExternalLink
			href="#"
			icon="share"
			alt="Share Page"
			clickHandler={handleShareButton}
			style="left:3px;transform: scale(1.3);"
			label={lblShare}
		/>
	</li>
{/if}
