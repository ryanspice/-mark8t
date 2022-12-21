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
	import Chip from "./Chip.svelte";
	import Textfield from "@smui/textfield";
	import Input from "./Input.svelte";

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

	import { _API_TENANT_, _API_URL_ } from "../stores.js";
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

<Dialog
	bind:open
	aria-labelledby="fullscreen-title"
	aria-describedby="fullscreen-content"
	on:SMUIDialog:closed={closeHandler}
>
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
		<Card>
			<PrimaryAction on:click={() => clicked++}>
				<Media class="card-media-16x9" aspectRatio="16x9" />

				<img src={data.thumb} alt="Placeholder image" />
				<Button
					on:click={() => {
						data.thumb =
							"http://dundasandsons.ca/dev/_api/logo_black.jpg";
					}}
				>
					<Label>Remove Image</Label>
				</Button>
				<Button
					on:click={() => {
						document.getElementById("fileToUpload").click();
					}}
				>
					<Label>Browse for Image</Label>
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
			<Actions>
				<ActionButtons>
					<form
						action={_API_URL_ + "/postimagetobid.php"}
						method="post"
						enctype="multipart/form-data"
						target="dummyframe"
					>
						<iframe
							name="dummyframe"
							id="dummyframe"
							style="display:none"
							on:load={() => {
								let temp = data.thumb;
								data.thumb = "";
								data.thumb = temp;
							}}
						/>
						<input
							id="tenant"
							name="tenant"
							value={_API_TENANT_}
							style="display:none"
						/>
						<input
							type="file"
							name="fileToUpload"
							id="fileToUpload"
							on:change={(e) => {
								//console.log(e.target.files[0]);
								document
									.getElementById("fileToUploadSubmit")
									.click();
								console.log(_API_TENANT_);
								data.thumb =
									_API_URL_ +
									"/" +
									_API_TENANT_ +
									"/images/" +
									e.target.files[0].name;
								setTimeout(() => {
									let temp = data.thumb;
									data.thumb = "";
									data.thumb = temp;
								}, 1000);
							}}
							style="display:none"
						/>
						<input
							type="submit"
							value="Upload Image"
							name="submit"
							id="fileToUploadSubmit"
							style="display:none"
						/>
					</form>
				</ActionButtons>
				<ActionIcons>
					<!-- <IconButton disabled on:click={()=> clicked++}
						toggle
						aria-label="Add to favorites"
						title="Add to favorites"
						>
						<Icon class="material-icons" on>favorite</Icon>
						<Icon class="material-icons">favorite_border</Icon>
					</IconButton>
					<IconButton disabled class="material-icons" on:click={()=> clicked++}
						title="Share">share</IconButton>
					<IconButton disabled class="material-icons" on:click={()=> clicked++}
						title="More options">more_vert</IconButton> -->
				</ActionIcons>
			</Actions>
		</Card>
		<!-- <Header>
		<Title id="fullscreen-title">Terms and Conditions</Title>
		<IconButton action="close" class="material-icons">close</IconButton>
	</Header>-->
	</Content>
	<Actions>
		<Button
			action="accept"
			defaultAction
			on:click={(e) => {
				onSave(data);
				onDismiss();
			}}
		>
			<Label>Save</Label>
		</Button>
		<Button
			action="reject"
			style="color:red"
			on:click={(e) => {
				if (
					confirm(
						"Are you sure you want to delete " + data.name + "?"
					)
				) {
					onDelete(data.id);
					onDismiss();
				}
				e.stopPropagation();
			}}
		>
			<Label>Remove</Label>
		</Button>
	</Actions>
</Dialog>

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
