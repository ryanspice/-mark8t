<script>
	import QuickActionButtons from "../store/QuickActionButtons.svelte";
	import ItemSectionWithFilter from "../ItemSectionWithFilter.svelte";
	export let filter = "";
	export let title = "";
	export let label = "";
	export let price = false;
	export let displayCount = 12;
</script>

<ItemSectionWithFilter {label} {title} {filter} {price} {displayCount} />
<!-- {#each filters as filter}
		<h2 class="filter-title">{filter.name}</h2>
		<h1 class="filter-title">{filter.name}</h1>
		<QuickActionButtons /> -->

<!-- <div class="filter-grid">
			{#each filter.items as item}
				<div class="filter-item">{item.name}</div>
			{/each}
		</div> -->

<!-- {/each} -->
<style>
</style>
