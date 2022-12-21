<script>
	//import validate from 'validate.js';

	import Field from "./Field.svelte"; // used to build our form fields
	import Box from "./Box.svelte"; // just for show
	import { storeFE } from "./store.js"; // store our form state
	let objForm; // @testing - used to listen for changes in our form state

	// @testing - keep up to date on the form object
	const unsubscribe = storeFE.subscribe((value) => {
		objForm = value;
	});

	// opting for JSON string config (which is what we would want if we are pulling this config from say a server data API)
	// NOTE: the 'fIndex' value is used within our form components to let us know which form element object to work with within our main 'storeFE' object store (it must increment each form element starting at 0). The 'fType' value tells the Field.svelte component which form element to build.
	let objFormConfig = JSON.parse(`{
	"formElements": [
		{
				"fIndex":0,
				"fId":"cc2",
				"fDescription":"Just a test checkbox that is only for show",
				"fType": "CheckBox",
				"fValue": "true",
				"fDisable":"some random property"
		},
		{
				"fIndex":1,
				"fId":"ct1",
				"fDescription":"This textbox has simple validation of length min=3, max=20. Change the text below to test the error message",
				"fType": "TextArea",
				"fValue": "A",
				"fValidation":"here were might want to add our form element validation config, which is current hard-coded into the app"
		}
	]
}`);
	// @testing: let us know when the form values have changed (the storeFE object has updated)
	$: {
		console.log("objForm:");
		console.log(objForm);
		formValidate();
	}
	$storeFE = objFormConfig; // save the initial form configuration to the store

	// validation-------------------
	// These are the constraints used to validate the form
	const constraints = {
		ct1: {
			// And it must be between 3 and 20 characters long
			length: {
				minimum: 3,
				maximum: 20,
			},
		},
	};

	let validationArray = [];
	// show our form validation (@testing - we are running this at every change event)
	function formValidate() {
		// @testing - below we are simply hard-coding the form value saved to the store
		// 		validationArray = validate({ [$storeFE.formElements[1].fId]:$storeFE.formElements[1].fValue}, constraints);
		// 		if (validationArray) console.log(validationArray);
	}
</script>

<div />
<div class="p-4">
	<div class="mb-3">
		<a href="#about" class="anchor" aria-hidden=""
			>About this app. (instructions below)</a
		>
	</div>
	<form id="main" novalidate>
		{#each objFormConfig.formElements as item}
			<Box>
				<Field objAttributes={item} />
			</Box>
		{/each}
	</form>
</div>
