<script>
	import { onMount } from "svelte";

	let quote = "";

	onMount(async () => {
		const response = await fetch("https://api.quotable.io/random");
		const data = await response.json();
		quote = data.content;
	});
</script>

<div class="mdc-typography--headline5">
	<blockquote class="mdc-typography--body2">
		"{quote}"
	</blockquote>
</div>
