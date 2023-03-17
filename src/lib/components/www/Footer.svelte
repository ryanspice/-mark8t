<script>
	$: website = {};
	import { _API_STORE_WEBSITE_ } from "../../store/stores.js";
	_API_STORE_WEBSITE_.subscribe((value) => {
		website = value;
	});
</script>

<copy id="ax-c4ca4238a0b923820dcc509a6f75849b">
	<p>
		Thanks - Merci - Grazi - Obrigado - Danken - Spasybi - 谢谢 - 감사
		<br />
		<br />
		<img
			alt="Canadian Flag"
			src="https://ryanspice.com/images/1920px-Flag_of_Canada_(Pantone).svg.png"
		/>
		<br />
		<br />
		Copyrights © 2022 All Rights Reserved.
		<a href={website.siteUrl}>{website.siteName}</a>
	</p>
</copy>

<style>
	a {
		background-color: transparent;
	}

	a:active,
	a:hover {
		outline: 0;
	}

	@media print {
		*,
		:after,
		:before {
			color: #000 !important;
			text-shadow: none !important;
			background: 0 0 !important;
			-webkit-box-shadow: none !important;
			box-shadow: none !important;
		}
	}

	* {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	:after,
	:before {
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
	}

	a,
	a:visited {
		text-decoration: underline;
	}

	a:focus,
	a:hover {
		//color: #fe0100;
		cursor: pointer;
		opacity: 0.5;
		-webkit-transform: scale(1.1) 0.2s ease;
		transform: scale(1.1) 0.2s ease;
		animation: bubble 1s forwards;
		-webkit-animation: bubble 1s forwards;
	}

	a:focus {
		color: var(--primary);
		outline: 5px auto -webkit-focus-ring-color;
		outline-offset: -2px;
	}

	/*! CSS Used from: Embedded */
	* {
		-webkit-transition: all 0.3s ease;
		transition: all 0.3s ease;
	}

	::-webkit-scrollbar {
		width: 0.5em;
		height: 0.5em;
	}

	::-webkit-scrollbar-thumb {
		background: slategray;
	}

	::-webkit-scrollbar-track {
		background: #b8c0c8;
	}

	main * {
		animation: fade-top-down ease-out 0.2s;
		animation-iteration-count: 1;
		transform-origin: 50% 50%;
		animation-fill-mode: forwards;
		-webkit-animation: fade-top-down ease-out 0.2s;
		-webkit-animation-iteration-count: 1;
		-webkit-transform-origin: 50% 50%;
		-webkit-animation-fill-mode: forwards;
		-moz-animation: fade-top-down ease-out 0.2s;
		-moz-animation-iteration-count: 1;
		-moz-transform-origin: 50% 50%;
		-moz-animation-fill-mode: forwards;
		-o-animation: fade-top-down ease-out 0.2s;
		-o-animation-iteration-count: 1;
		-o-transform-origin: 50% 50%;
		-o-animation-fill-mode: forwards;
		-ms-animation: fade-top-down ease-out 0.2s;
		-ms-animation-iteration-count: 1;
		-ms-transform-origin: 50% 50%;
		-ms-animation-fill-mode: forwards;
	}

	main a {
		color: #fe0100;
	}

	copy {
		font-family: monospace;
		text-align: center;
		display: block !important;
		padding: 2rem;
		display: block;
		min-width: 320;
		margin: 0 auto;
		color: rgba(255, 255, 255, 0.25);
	}

	copy {
		font-size: 16px;
	}

	@media screen and (min-width: 420px) {
		copy {
			font-size: calc(16px + 2 * ((100vw - 420px) / 300));
		}
	}

	@media screen and (min-width: 720px) {
		copy {
			font-size: 18px;
		}
	}

	copy p:first-child {
		text-align: center;
		font-family: monospace;
		display: block !important;
		padding-top: 2rem;
		padding-bottom: 2rem;
		display: block;
		min-width: 320;
		max-width: 780px;
		margin: 0 auto;
		color: rgba(255, 255, 255, 0.55);
	}

	copy img {
		width: 40px;
	}

	/*! CSS Used keyframes */
	@keyframes fade-top-down {
		0% {
			opacity: 0.23;
			transform: translate(0px, -25px);
		}

		100% {
			opacity: 1;
			transform: translate(0px, 0px);
		}
	}

	@-moz-keyframes fade-top-down {
		0% {
			opacity: 0.23;
			-moz-transform: translate(0px, -25px);
		}

		100% {
			opacity: 1;
			-moz-transform: translate(0px, 0px);
		}
	}

	@-webkit-keyframes fade-top-down {
		0% {
			opacity: 0.23;
			-webkit-transform: translate(0px, -25px);
		}

		100% {
			opacity: 1;
			-webkit-transform: translate(0px, 0px);
		}
	}

	@-o-keyframes fade-top-down {
		0% {
			opacity: 0.23;
			-o-transform: translate(0px, -25px);
		}

		100% {
			opacity: 1;
			-o-transform: translate(0px, 0px);
		}
	}

	@-ms-keyframes fade-top-down {
		0% {
			opacity: 0.23;
			-ms-transform: translate(0px, -25px);
		}

		100% {
			opacity: 1;
			-ms-transform: translate(0px, 0px);
		}
	}
</style>
