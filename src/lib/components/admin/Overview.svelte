<script>
	import Card from "@smui/card";
	export let account = {};
	export let website = {};
</script>

<Card class="smui-card--outlined w-75">
	<div class="smui-card__content">
		<h2 class="smui-card__title">{website.siteName}</h2>
		<h5>Welcome {account.name}</h5>
		<p />
	</div>
</Card>
<div class="smui-card__content">
	<a href="/admin/account" class="smui-card__action w-100">Account</a><br />
	<a href="#" class="smui-card__action w-100">Contact & Social</a><br />
	<hr />
	<a href="#" class="smui-card__action w-100">Website</a><br />
	<a href="#" class="smui-card__action w-100">Products</a>
	<a href="#" class="smui-card__action w-100">Layouts</a>
	<a href="#" class="smui-card__action w-100">Secrets</a>
</div>
