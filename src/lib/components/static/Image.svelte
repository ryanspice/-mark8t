<script>
	export let src;
	export let sizes;
	export let srcSet;
	export let alt;

	let imageElement;
</script>

<picture>
	<source {sizes} srcset={srcSet} />
	<img
		bind:this={imageElement}
		{src}
		{alt}
		aria-hidden={!alt}
		role={alt ? "img" : null}
	/>
</picture>
