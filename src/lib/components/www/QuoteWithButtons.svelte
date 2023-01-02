<script>
	import { base } from '$app/paths';

	import Card, {
		Content,
		PrimaryAction,
		Media,
		MediaContent,
		Actions,
		ActionButtons,
		ActionIcons,
	} from '@smui/card';
	import Button, { Label } from '@smui/button';
	import IconButton, { Icon } from '@smui/icon-button';

	import ExternalLink from '../../src/components/header/banner/ExternalLink.svelte';

	import { _API_STORE_WEBSITE_, _WEBSITE_QUOTE_ } from '../stores.js';
	let v;
	_WEBSITE_QUOTE_.subscribe(value => {
		v = value;
	});
	$: website = {};
	_API_STORE_WEBSITE_.subscribe(value => {
		website = value;
	});
	const settingIncludeQuotes = false;
</script>
<style>
	h3 {
		padding-top: 320px;
		padding-bottom: 320px;
		width: 100%;
		text-align: center;
	}

	button {
		padding: 1rem;
		background: black;
	}

	.menu {
		background: var(--primary-transparent);
		color: black;
		padding-left: 13px;
		padding-right: 13px;

		padding-top: 13px;
		padding-bottom: 13px;
	}

	.uber {
		background: var(--primary-transparent);
		padding-left: 13px;
		padding-right: 13px;
	}

	.skip {
		background: var(--primary-transparent);
		padding-left: 13px;
		padding-right: 13px;

		padding-top: 13px;
		padding-bottom: 13px;
	}
</style>
{#if (settingIncludeQuotes)}
<h3>"{website.siteDescription || v}" </h3>
{:else}
<h3>
	<!-- {website.siteDescription || v} -->
	<br />
	<p>
		For events or bookings, please contact us at <br />
		<ExternalLink href="mailto:	{website.siteEmail}">{website.siteContactEmail}</ExternalLink>
		<br /> or call us at<br />
		<ExternalLink href="tel:{website.sitePhone}">{website.siteContactPhone}
		</ExternalLink>
	</p>
	<br />
	<h2>Hungry?</h2><br /><Button defaultAction on:click={(e)=>{
		onClose();
		}}>
		<Label>
			<h4 class="menu">
				<a href={base+"/menu"}>Food Menu</a>
			</h4>
		</Label>
	</Button><Button defaultAction on:click={(e)=>{
		onClose();
		}}>
		<Label>
			<h4 class="menu">
				<a href={base+"/menu/#beverages"}>Drinks Menu</a>
			</h4>
		</Label>
	</Button>
	<br />
	<br />
	or
	<br />
	<br />
	<Button defaultAction on:click={(e)=>{
		onClose();
		}}>
		<Label>
			<img width="125px" class="uber" src={base + '/UberEats-Logo.png' } alt="Uber Eats" />
		</Label>
	</Button>
	<Button defaultAction on:click={(e)=>{
		onClose();
		}}>
		<Label>
			<img width="125px" class="skip" src={base + '/SKIPTheDishes-Logo.png' } alt="Skip The Dishes" />
		</Label>
	</Button>
</h3>
{/if}