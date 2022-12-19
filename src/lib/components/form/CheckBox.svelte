<script>
	/* Here we want to get the store index */
	import { storeFE } from './store.js';
	export let objAttributes = {};
	const fIndex = objAttributes.fIndex;
	const strDisable = objAttributes.fDisable;
	function fDisable() {
		if (strDisable) {
			console.log('do some stuff like check: ' + strDisable);
		}
	}
	console.log("checkbox here, showing you my field attributes:");
	console.log(objAttributes);
</script>
{objAttributes.fId}. <strong>{objAttributes.fDescription}</strong>
<div>
	<input id={objAttributes.fId} type=checkbox bind:checked={$storeFE.formElements[fIndex].fValue}
		on:change={fDisable}>
</div>