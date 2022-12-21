<script>
	import { _NEWSLETTER_URL_ } from "../../../stores.js";
	let url = "";
	let h2Text = "keep in touch";
	let h1Text = "NEWSLETTER";
	_NEWSLETTER_URL_.subscribe((value) => {
		url = value;
	});
</script>

<section>
	<h2>{h2Text}</h2>
	<h1>{h1Text}</h1>
	<iframe title="newsletter" src={url} />
</section>

<style>
	iframe {
		outline: 0;
		border: 0;
		width: 100%;
		min-height: 460px;
		z-index: 2;
		position: relative;
	}

	@media screen and (max-width: 768px) {
		iframe {
			min-height: 600px;
			outline: 0;
			border: 0;
			width: 120%;
			min-height: 460px;
			z-index: 2;
			position: relative;
			transform: scale(0.8);
			position: relative;
			left: -10%;
		}
	}

	h1 {
		font-size: bold;
		width: 100%;
		text-align: center;
		margin-bottom: 2rem;
	}

	h2 {
		margin-top: 6rem;
		width: 100%;
		text-align: center;
	}

	section,
	iframe {
		overflow: hidden !important;
	}
</style>
