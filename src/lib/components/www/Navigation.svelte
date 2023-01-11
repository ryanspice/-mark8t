<script>
	import { base } from "$app/paths";
</script>

<nav class="uppercase">
	{#if window.location.pathname == base}
		<a href={base + "/products"} target="_top">BEER</a>
	{:else}
		<a href={base + "/"} target="_top">HOME</a>
	{/if}
	<a href={base + "/events"} target="_top">EVENTS</a>
	<a href={base + "/location"} target="_top">LOCATION</a>
	<a href={base + "/calendar"} target="_top">CALENDAR</a>
</nav>

<style>
	nav {
		width: 100%;
		margin: 0px auto;
		display: flex;
		max-width: 720px;
		overflow-y: none;
		overflow-x: auto;
	}

	a {
		flex: auto;
		text-decoration: none;
		font-size: 1rem;
		font-weight: 600;
		color: #444;
		line-height: 1.5;
		color: #fe0100;
		text-shadow: black 0em 0.225em 0em;
		padding: 2.5rem;
	}
</style>
