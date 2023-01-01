<script>
	export let items;

	const handleScroll = (e) => {
		const { scrollY, scrollHeight, clientHeight } = e.target;
		if (window.scrollY > 333) {
			console.log(window.scrollY)
			document.getElementById('scroll-to-top').style.display = 'block';
			document.getElementById('aside-menu').style.position = 'fixed';
			document.getElementById('aside-menu').style.top = '-330px';
		} else {
			document.getElementById('scroll-to-top').style.display = 'none';
			document.getElementById('aside-menu').style.position = 'absolute';
			document.getElementById('aside-menu').style.top = '0px';
		}
	};
</script>
<style>
	#aside-menu {
		position: absolute;
		margin-top: 450px;
		top: 0px;
		max-width: 20%;
	}

	#aside-menu li {
		list-style: none;
		padding-top: 1vh;
		padding-bottom: 1vh;
	}

	#scroll-to-top {
		position: fixed;
		bottom: 0px;
		right: 0px;
		margin: 1rem;
		padding: 1rem;
		background-color: #000000;
		color: #ffffff;
		/* border-radius: 50%; */
		cursor: pointer;
		display: none;
		z-index: 30;
	}
</style>
<svelte:window on:scroll={handleScroll} />
<aside id="aside-menu">
	{#each items as item}
	{#if item.type === 'header'}
	<li href={item.title}><a href={"#"+item.slug}>{item.title}</a></li>
	{:else if item.type === 'divider'}
	<hr />
	{:else if (item.type === '' || item.type === 'link')}
	<!-- <li href={item.title}><a href={"#"+item.slug}>{item.title}</a></li> -->
	{/if}
	{/each}
</aside>
<div id="scroll-to-top" style="display: none;">
	<a href="#top">
		<img src="/images/scroll-to-top.png" alt="Scroll to top" />
	</a>
</div>