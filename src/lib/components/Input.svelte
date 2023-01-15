<script>
	import Textfield from "@smui/textfield";
	export let type;
	export let disabled = false;
	export let value = "";
	export let label = "";
	export let className = "";
	export let icon = "";
	export let variant;
	export let click = () => {};
	export let enter = () => {};
	export let input = () => {};
	import { Icon } from "@smui/icon-button";
</script>

<Textfield
	class={"w-100 " + className}
	bind:value
	{type}
	{variant}
	{label}
	on:click={enter}
	on:input={input}
	{disabled}
>
	<Icon
		class="material-icons"
		slot="trailingIcon"
		on:click={(e) => {
			click(e);
			value = "";
		}}
		hidden={disabled}>{icon || "delete"}</Icon
	>
</Textfield>
