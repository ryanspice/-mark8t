<script>
	import { base } from "$app/paths";
	import Paper, { Title, Subtitle } from "@smui/paper";
	import { onMount } from "svelte";
	let path = window.location.pathname
		.replaceAll(base, "")
		.replaceAll("/", " / ")
		.replace(" / ", "");

	onMount(() => {
		const listener = () => {
			path = window.location.pathname
				.replaceAll(base, "")
				.replaceAll("/", " / ")
				.replace(" / ", "");
		};
		window.addEventListener("popstate", listener);

		const pushUrl = (href) => {
			history.pushState({}, "", href);
			window.dispatchEvent(new Event("popstate"));
		};
	});
</script>

<Paper elevation={0} class="container transparent">
	<nav>
		{#if path.split(" / ").length == 0}
			<span>
				<a href={base + "/admin/"}> {path.split(" / ")[0]}</a>
			</span>
		{/if}
		{#if path.split(" / ").length == 1}
			<span>
				<a href={base + "/admin/"}>Home</a>
			</span>
			<span>
				<a
					href={base +
						"/admin/" +
						path.split(" / ")[0].toLowerCase().replaceAll(" ", "-")}
				>
					{path.split(" / ")[0]}
				</a>
			</span>
		{/if}
		{#if path.split(" / ").length > 1}
			{#each path.split(" / ") as item}
				<span>
					<a
						href={base +
							"/admin/" +
							item.toLowerCase().replaceAll(" ", "-")}
					>
						{item}
					</a>
				</span>
			{/each}
		{/if}
	</nav>

	<!-- 
	<div><a href={base + "/admin"}>Home</a></div>
-->
</Paper>

<style>
	:global(.transparent) {
		color: var(--primary) !important;
		background-color: transparent !important;
	}
	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	nav span {
		padding-left: 0.5rem;
		padding-right: 0.5rem;
		padding-bottom: 1rem;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
</style>
