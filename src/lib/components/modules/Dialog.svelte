<script>
	import { createEventDispatcher } from "svelte";
	import Dialog from "@smui/dialog";
	import TextField from "@smui/textfield";

	const dispatch = createEventDispatcher();

	export let value;

	export let open = false;

	const handleClose = () => {
		open = false;
	};

	const handleSave = () => {
		dispatch("save", { value });
		open = false;
	};
</script>

<Dialog {open} onClose={handleClose}>
	<!-- <h2>Change Value</h2> -->
	<TextField {value} onInput={(e) => (value = e.target.value)} />
	<button on:click={handleSave}>Save</button>
</Dialog>

<style>
	.smui-dialog {
		max-width: 500px;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		margin-bottom: 20px;
		font-size: 24px;
	}

	.smui-textfield {
		width: 100%;
		margin-bottom: 20px;
	}

	button {
		padding: 10px 20px;
		background-color: lightblue;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 16px;
		cursor: pointer;
	}

	button:hover {
		background-color: blue;
	}

	button:active {
		transform: translateY(2px);
	}
</style>
