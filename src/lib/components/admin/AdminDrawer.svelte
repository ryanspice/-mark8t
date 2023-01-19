<script>
	import Drawer, {
		AppContent,
		Content,
		Header,
		Title,
		Subtitle,
	} from "@smui/drawer";
	import Button, { Label } from "@smui/button";
	import List, { Item, Text } from "@smui/list";
	import Card from "@smui/card";
	import { base } from "$app/paths";

	let active = "";

	// loop through the files in ./modules/ creating an array of the names
	import * as modules from "../modules/index";
	const adminPanels = Object.keys(modules.default);

	function setActive(value) {
		active = value;
		//redirect to the value of the active panel
		window.location.href = base + `/admin/${value.toLowerCase()}`;
	}

	export let onToggle = () => {
		open = !open;
		// onToggle();
	};
	let handleToggle = () => {};
</script>

<div class="drawer-container">
	<Drawer open={true} style="">
		<Content>
			<Card>
				<List>
					{#each adminPanels as item}
						<a
							class="w-100"
							href={base + `/admin/${item.toLowerCase()}`}
						>
							<Item activated={item === active}>{item}</Item>
						</a>
					{/each}
				</List>
			</Card>
		</Content>
	</Drawer>

	<AppContent class="app-content">
		<main class="main-content">
			<slot />
		</main>
	</AppContent>
</div>

<style>
	.mdc-drawer--closing {
		transform: translateX(200%) !important;
		transition-duration: 200ms !important;
	}

	/* These classes are only needed because the
    drawer is in a container on the page. */
	.drawer-container {
		/* position: relative; */
		display: flex;
		/* height: 350px; */
		/* max-width: 600px; */
		border: 1px solid
			var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
		overflow: hidden;
		z-index: 0;
	}
	.drawer-container > .mdc-card {
		/* height: 100vh; */
	}
	* :global(.app-content) {
		flex: auto;
		overflow: auto;
		position: relative;
		/* color: white; */
		flex-grow: 1;
	}

	.main-content {
		overflow: auto;
		padding: 16px;
		height: 100%;
		box-sizing: border-box;
	}
</style>
