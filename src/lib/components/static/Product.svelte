<script>
	import { onMount } from "svelte";
	import Card, {
		Content,
		PrimaryAction,
		Media,
		MediaContent,
		Actions,
		ActionButtons,
		ActionIcons,
	} from "@smui/card";
	import Button, { Label } from "@smui/button";
	import IconButton, { Icon } from "@smui/icon-button";

	import Dialog, { Header, Title } from "@smui/dialog";
	import Chip from "../Chip.svelte";
	// import Textfield from "@smui/textfield";
	import Input from "../Input.svelte";
	import { _TENANT, _API } from "../../stores.js";

	let valueA = "";
	let valueB = "";
	let valueC = "";
	let response = "";

	export let data = {
		name: "",
		description: "",
		tags: [],
		price: 0,
		ibu: "N/A",
		abv: "N/A",
		image: "",
		thumb: "",
		link: "",
		id: 3,
	};

	let clicked = 0;
	let startData = {};

	export let open = false;
	export let onDismiss = () => {};
	export let onDelete = () => {};
	export let onSave = () => {};
	export let onClose = () => {};

	//
	function closeHandler(e) {
		switch (e.detail.action) {
			case "close":
				data = { ...startData };
				onClose();
				response = "Closed without response.";
				console.log(response);
				break;
			case "reject":
				response = "Rejected.";
				onDelete(data.id);
				break;
			case "accept":
				response = "Accepted.";
				break;
		}
	}

	const standardFields = {
		name: "Product Name",
		style: "Product Style",
		description: "Product Description",
	};

	const customFields = {
		ibu: "IBU",
		abv: "ABV",
		// 'price':'Price',
	};
</script>

<!-- <Dialog
	bind:open
	aria-labelledby="fullscreen-title"
	aria-describedby="fullscreen-content"
	on:SMUIDialog:closed={closeHandler}
> -->
<Actions>
	<Button
		action="close"
		defaultAction
		on:click={(e) => {
			onClose();
		}}
	>
		<Label>
			<Icon
				class="material-icons"
				style="    font-size: 2rem; margin-top: -6px;margin-left:-4px"
				on:click={(e) => {
					closeHandler({ detail: { action: "close" } });
				}}>{"close"}</Icon
			>
		</Label>
	</Button>
</Actions>
<Content id="fullscreen-content">
	<!-- <Card> -->
	<PrimaryAction on:click={() => clicked++}>
		<Media class="card-media-16x9" aspectRatio="16x9" />

		<img src={data.thumb} alt="Placeholder image" />

		<Button
			on:click={() => {
				data.thumb = "http://mark8t.ca/dev/storage/thumb.jpg";
			}}
		>
			<Label>Remove Image</Label>
		</Button>

		<Button
			on:click={() => {
				document.getElementById("fileToUpload").click();
			}}
		>
		</Button>
		<Content class="mdc-typography--body2">
			{#each Object.entries(standardFields) as [key, value]}
				<Input
					bind:value={data[key]}
					label={value}
					on:click={() => {
						data[key] = "";
					}}
				/>
			{/each}
			<br />
			<br />

			{#each Object.entries(customFields) as [key, value]}
				<Input
					bind:value={data[key]}
					label={value}
					on:click={() => {
						data[key] = "";
					}}
				/>
			{/each}
			<br />
			<br />

			<!-- material input for adding tags -->
			<Chip bind:keyed={data.tags} />
		</Content>
	</PrimaryAction>
</Content>

<!-- </Dialog> -->
<style>
	img {
		max-width: 375px;
		width: 100%;
		vertical-align: middle;
		margin: 0px auto;
	}

	:global(.mdc-card) {
	}

	:global(.mdc-card__media--16-9::before) {
		margin-top: 12px !important;
	}

	:global(.mdc-card__actions) {
		direction: rtl;
	}
</style>
