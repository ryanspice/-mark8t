<script>
	// import 'redux';

	import { onMount } from "svelte";

	// const { STATUS_STATE } = require("../../store/actions/status");
	import "./Drawer.svelte.scss";
	import { AppContent, Content, Header, Subtitle, Scrim } from "@smui/drawer";
	import Drawer from "@smui/drawer";
	import Dialog, { Title, Actions, InitialFocus } from "@smui/dialog";
	import IconButton from "@smui/icon-button";
	// import H6 from '@smui/common';
	export let id;
	export let title = "";
	export let subtitle = "";
	export let open = false;
	export let right = false;
	export const toggle = () => {
		return (open = !open);
	};
	//
	let DragMouse = [0, 0];
	let DragBounds = [48, 1248];
	let DragResize = false;
	let drawerDragX = 58;
	let drawerOffset = 32;
	let drawerCssClass = `${right ? "right" : ""}`;
	/**/
	const handleClick = async () => {
		// store.dispatch({
		//   type: STATUS_STATE,
		//   value: 1090
		// });
	};
	/**
	 * return {X,Y} of mouse based on MouseEvent
	 * @param event
	 */
	const handleMouseMove = (event) => {
		return (DragMouse = {
			x: event.x,
			y: event.y,
		});
	};
	/**
	 * assigns width to
	 * @param event
	 */
	const handleDragResize = (event) => {
		if (!event) return;
		let ClientX = event.x || event.screenX || event.clientX;
		let x = ClientX || drawerDragX;
		if (x >= DragBounds[0])
			if (x <= DragBounds[1])
				if (DragResize) {
					drawerDragX = x + 6;
				}
		if (drawerDragX < 92) drawerDragX = 58;
		if (DragResize)
			requestAnimationFrame(() => {
				handleDragResize(DragMouse);
			});
		drawerDragX = x;
		document.querySelector(":root").style.setProperty("--view-x", x + "px");
		localStorage.setObject("--view-x", x);
	};
	/**
	 * initialize
	 * @param event
	 */
	const handleDragStart = (event) => {
		if (!DragResize) {
			DragResize = true;
			requestAnimationFrame(() => {
				handleDragResize(DragMouse);
			});
			drawerCssClass = `drawer-extend-1 drag mdc-drawer--open ${
				right ? "right" : ""
			}`;
		}
	};
	/**
	 * stop drag
	 */
	const handleDragStop = () => {
		requestAnimationFrame(() => {
			DragResize = false;
			drawerCssClass.replace("drag", "");
			if (drawerDragX < 92) drawerDragX = 58;
		});
	};
	/**
	 *
	 */
	const handleDoubleClick = () => {
		drawerOffset++;
		if (drawerOffset > 2) drawerOffset = 0;
		drawerCssClass = `drawer-extend-${drawerOffset} mdc-drawer--open ${
			right ? "right" : ""
		}`;
		// store.dispatch({
		// 	type: "APPLICATION_ASSIGN_DRAWER_OFFSET",
		// 	value: drawerOffset
		// });
	};
	/**
	 *
	 */
	onMount(() => {
		document.addEventListener("mousemove", handleMouseMove);
		document.addEventListener("mouseup", handleDragStop);
		//document.addEventListener('dblclick', handleDoubleClick);
		let x = localStorage.getObject("--view-x") || 46;
		handleDragResize({ x: x });
		open = true;
		return;
		runtime.store.subscribe(async () => {
			const { application } = await runtime.store.getState();
			const { navigation } = await application;
			//open = navigation;
		});
	});
</script>

<section id={id || ""}>
	<div
		id="drawer-container"
		style="display:inline;"
		on:dblclick={handleDoubleClick}
	>
		<Drawer
			variant="modal"
			class={drawerCssClass}
			width={drawerDragX}
			bind:open
		>
			<Header>
				<Title>{title}</Title>
				<Subtitle>{subtitle}</Subtitle>
			</Header>
			<!-- DRAGGABLE AREA -->

			<div id="drawer-resize-control" on:mousedown={handleDragStart} />

			<!-- VIRTUAL LIST GETS APPENDED HERE -->

			<Content>
				<slot />
				<!--        <List></List>-->
			</Content>

			<!-- DELETE GRAPH BUTTON -->

			<IconButton
				style="background:black;position:absolute;bottom:48px;z-index:2;left:4px"
				class="material-icons"
				aria-label=""
				title=""
				on:click={handleClick}
				>delete_forever
			</IconButton>
		</Drawer>

		<Scrim />
	</div>
</section>
