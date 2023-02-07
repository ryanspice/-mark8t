<script>
	import { onMount } from "svelte";
	import { base } from "$app/paths";
	let hero;
	const updateBackground = () => {
		let background = "";

		let width = window.innerWidth;
		if (width >= 2048 - 400) {
			background = "background-2048.jpg";
		} else if (width >= 1920 - 300) {
			background = "background-1920.jpg";
		} else if (width >= 1248 - 200) {
			background = "background-1248.jpg";
		} else if (width >= 720 - 100) {
			background = "background-720.jpg";
		} else if (width >= 320) {
			background = "background-320.jpg";
		}
		if (hero.style.backgroundImage !== `url(${base}/${background})`)
			hero.style.backgroundImage = `url(${base}/${background})`;
	};
	onMount(updateBackground);
</script>

<svelte:window on:resize={updateBackground} />
<div id="hero" bind:this={hero} />

<style>
	.logo-fixed {
		width: 50px;
		height: 50px;
		left: 0px;
		top: 0px;
		position: fixed;
		z-index: 999999;
	}

	.logo {
		width: 100%;
		height: auto;
	}

	#hero {
		background-color: #10252e;
		opacity: 0.8;
		background: linear-gradient(0deg, #00000088 30%, #ffffff44 100%),
			no-repeat;
		background-size: cover;
		background-position: center;
		/* background-position-y: 0; */

		background-position: -50% -170px;
		background-repeat: repeat-x;

		filter: sepia(50%) contrast(150%) saturate(200%) brightness(100%)
			hue-rotate(-15deg) grayscale(45%);

		min-height: 1920px;
		min-height: 1662px;
		max-height: 1662px;

		width: 100%;
		display: inline-block;
		border: none;
		outline: none;
		height: 100%;
		margin-bottom: 0px;
		opacity: 0.1;
		position: relative;
		z-index: -1;
		position: absolute;
	}

	@media (max-width: 767px) {
		#hero {
			min-height: 720px;
			max-height: 720px;
		}
	}

	@media (max-width: 992px) {
		#hero {
			min-height: 720px;
			max-height: 720px;
			min-height: 1502px;
			max-height: 1502px;
		}
	}

	@media (max-width: 1200px) {
		#hero {
			min-height: 1662px;
			max-height: 1662px;
		}
	}

	span {
		position: relative;
		text-shadow: black 0em 0.25em 0em;
	}

	.social {
		position: relative;
		top: 28px;
	}

	@media (max-width: 767px) {
		.social {
			display: none;
		}
	}
</style>
