<h2>{h2}</h2>
<h1>{h1}</h1>
<slot />

<style>
	h1 {
		font-size: bold;
		width: 100%;
		text-align: center;
		margin-bottom: 4rem;
	}

	h2 {
		width: 100%;
		text-align: center;
	}

	section,
	iframe {
		overflow: hidden !important;
	}
</style>
