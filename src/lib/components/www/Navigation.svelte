<script>
	import { base } from "$app/paths";
	import { Icon } from "@smui/button";
	import Button, { Label } from "@smui/button";
	let isHomePage = window.location.pathname === "/";
	let navLinks = [
		{ name: "HOME", url: base + "/" },
		{ name: "RETAIL", url: base + "/retail" },
		{ name: "ON TAP", url: base + "/products" },
		{ name: "EVENT SPACE", url: base + "/events" },
		{ name: "LOCATION", url: base + "/location" },
		{ name: "CALENDAR", url: base + "/calendar" },
		{ name: "ORDER NOW", url: base + "/order" },
	];
	let homeLinks = navLinks.slice(0, 2);
	let otherLinks = navLinks.slice(2);

	const toggleMenu = () => {
		document.getElementsByTagName("nav")[0].classList.toggle("menu-open");
	};
</script>

<span class="hamburger">
	<Button on:click={toggleMenu}>
		<Label>
			<Icon
				class="material-icons"
				style="    font-size: 2rem; margin-top: -6px;margin-left:-4px"
				>{"menu"}</Icon
			>
		</Label>
	</Button>
</span>
<nav class="uppercase">
	{#if isHomePage}
		{#each [...homeLinks, ...otherLinks] as link}
			<a href={link.url} target="_top">{link.name}</a>
		{/each}
	{:else}
		{#each navLinks as link}
			<a href={link.url} target="_top">{link.name}</a>
		{/each}
	{/if}
</nav>

<style>
	nav {
		width: 100%;
		margin: 0px auto;
		display: flex;
		max-width: 730px;
		max-width: 1025px;
		overflow-y: none;
		overflow-x: auto;

		position: relative;
		z-index: 2;
	}

	a {
		flex: auto;
		text-decoration: none;
		font-size: 1rem;
		color: #444;
		line-height: 1.5;
		color: #fe0100;
		text-shadow: black 0em 0.225em 0em;
		padding: 2rem;
		padding-top: 2.5rem;
	}

	.hamburger {
		display: none;
		margin-top: 1rem;
		margin-left: 1rem;
	}

	/* Add css for hamburger menu */
	/* @media (max-width: 730px) { */
	@media (max-width: 1024px) {
		nav {
			flex-direction: column;
			max-height: 0;
			transition: max-height 0.35s ease-out;
		}

		.hamburger {
			display: block;
			margin-top: 1rem;
			margin-left: 1rem;
		}
		:global(nav.menu-open) {
			max-height: 100vh;
		}

		a {
			flex-basis: 100%;
			padding: 1rem;
			text-align: center;
			/* border-bottom: 1px solid lightgray; */
		}
	}

	/* Add animation */
	a {
		transition: transform 0.35s ease-out;
		transform: scale(0.95);
	}

	a:hover {
		transform: scale(1);
	}
</style>
