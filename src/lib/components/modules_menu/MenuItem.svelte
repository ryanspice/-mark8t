<script>
	import Card, {
		Content,
		PrimaryAction,
		Media,
		MediaContent,
		Actions,
		ActionButtons,
		ActionIcons,
	} from '@smui/card';
	export let className = "";
	export let data = {};
</script>
<style>
	.food-item {
		display: grid;
	}

	img {
		max-width: 375px;
		max-height: 211px;
		/* width: 100%; */
		vertical-align: middle;
		margin: 0px auto;
	}
</style>
<div class={"food-item "+className} id={data.slug}>
	<Content>
	<h5 class=""><strong class="">{data.label}</strong></h5>
<!-- <Media class=" card-media-16x9" aspectRatio="16x9" /> -->
<!-- <img src={data.image} alt="Placeholder image" /> -->
<h5 class=""><strong class="">${data.price}</strong></h5>
<div class="">
	<div class="">
		<light class="">{data.description}</light>
	</div>
</div>
</Content>
</div>