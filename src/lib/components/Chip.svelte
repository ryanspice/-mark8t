<script lang="ts">
	import Chip, { Set, TrailingAction, Text } from '@smui/chips';
	import Button, { Label } from '@smui/button';
	import Input from "./Input.svelte";

	let newChip;
	export let keyed = [];

	function addKeyedChip() {
		if (newChip.length === 0)
			return;
		if (keyed.length) {
			keyed.push({ k: keyed[keyed.length - 1].k + 1, v: newChip });
			keyed = keyed;
		} else {
			keyed.push({ k: 1, v: newChip });
			keyed = keyed;
		}
		newChip = '';
	}
</script>

<Input bind:value={newChip} label={"Add a tag"} variant="filled" click={addKeyedChip} icon="+" />
{#if (keyed?.length>0)}
<Set chips={keyed} let:chip key={(chip)=> chip.k} input>
	<Chip {chip}>
		<Text>{chip.v}</Text>
		<TrailingAction icon$class="material-icons">cancel</TrailingAction>
	</Chip>
</Set>
{/if}