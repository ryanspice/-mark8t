<script>
	let url;
	import { _SENDGRID_NEWSLETTER_URL_ } from '../stores.js';
	_SENDGRID_NEWSLETTER_URL_.subscribe(value => {
		url = value;
	});
</script>
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
<section>
	<h2>keep in touch</h2>
	<h1>NEWSLETTER</h1>
	<iframe title="newsletter" src={url}>
	</iframe>
</section>