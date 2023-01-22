<script>
	import { base } from "$app/paths";
	import { onMount } from "svelte";
	let ageGate;
	onMount(() => {
		ageGate = localStorage.getObject("ageGate");
	});
</script>

{#if !ageGate}
	<aside>
		<div>
			<img src={base + "/logo_og.jpg"} alt="logo" class="logo" />

			<hr />
			<h2>Are you over 18?</h2>
			<p style="text-indent:0.5rem">
				To visit our website, you must be of legal drinking age.
			</p>
			<button
				on:click={() => {
					localStorage.setObject("ageGate", "true");
					ageGate = true;
				}}>Yes</button
			>
			<button
				on:click={() => {
					window.location.href = "https://www.google.ca/";
				}}>No</button
			>
		</div>
	</aside>
{/if}

<style>
	aside {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 100;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
	}

	button {
		border: 0;
		margin: 0;
		padding: 0;
		width: 48%;
		height: 60px;
		color: red;
		background: rgba(0, 2, 77);
		font-size: 18px;
		margin-top: 20px;
		pointer-events: all;
	}

	img {
		max-height: 300px;
	}

	div {
		background-color: black;
		padding: 1rem;
		border-radius: 0.5rem;
		text-align: center;
	}
</style>
