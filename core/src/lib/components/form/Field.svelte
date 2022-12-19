<script>
	import CheckBox from './CheckBox.svelte';
	import TextArea from './TextArea.svelte';

	export let objAttributes = {};

	const fieldComponents = {
		'CheckBox': CheckBox,
		'TextArea': TextArea
	};
</script>
<div>
	<svelte:component this={fieldComponents[objAttributes.fType]} {objAttributes} />
</div>