<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";
	const logo = base + "/logo_red.jpg";
	let redirect = base + "/admin/login";
	onMount(() => {
		if (window.location.pathname !== "/") {
			redirect = base;
		}
	});
</script>

<a href={redirect} class="logo-fixed">
	<img src={logo} alt="logo" class="logo-fixed" />
</a>

<style>
	.logo-fixed {
		width: 50px;
		height: 50px;
		left: 0px;
		top: 0px;
		position: fixed;
		z-index: 999999;
	}
</style>
