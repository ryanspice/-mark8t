<script>
	import { storeFE } from "./store.js";
	//import validate from 'validate.js';
	export let objAttributes = {};
	const fIndex = objAttributes.fIndex;
	const errClassArray = ["invisible", "alert alert-warning"];
	let errClass = errClassArray[0]; // default to invisible

	// @testing - normally we would include the constrant in with the main for configuration
	const constraints = {
		ct1: {
			// And it must be between 3 and 20 characters long
			length: {
				minimum: 3,
				maximum: 20,
			},
		},
	};
	let objForm; // @testing - used to listen for changes in our form state
	// @testing - keep up to date on the form object
	const unsubscribe = storeFE.subscribe((value) => {
		objForm = value;
	});
	// @testing: let us know when the form values have changed (the storeFE object has updated)
	$: {
		console.log(objForm);
		formValidate();
	}
	let validationArray;
	// show our form validation (@testing - we are running this at every change event)
	function formValidate() {
		// @testing - below we are simply hard-coding the form value saved to the store
		// NOTE: we must wrap the form element fId value in brackets
		//var objVal = validate({ "ct1":$storeFE.formElements[fIndex].fValue}, constraints);

		var objVal = validate(
			{
				[$storeFE.formElements[fIndex].fId]:
					$storeFE.formElements[fIndex].fValue,
			},
			constraints
		);
		validationArray = "";
		errClass = errClassArray[0];
		if (objVal) {
			errClass = errClassArray[1];
			var plArray = Object.keys(objVal);
			plArray.forEach((p) => {
				validationArray += objVal[p];
			});
		}
	}

	console.log("textarea here, showing you my field attributes:");
	console.log(objAttributes);
</script>

<div>
	{objAttributes.fId}. <strong>{objAttributes.fDescription}</strong>
</div>
<div class={errClass}>
	Err message:
	{#if validationArray}
		{validationArray}
	{/if}
</div>
<textarea
	id={objAttributes.fId}
	bind:value={$storeFE.formElements[fIndex].fValue}
/>
