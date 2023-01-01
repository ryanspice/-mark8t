<script>

	import MediaQuery from 'svelte-media-queries'
	import { _NEW_MENU_, _NEW_MENU_ITEM_ } from '../../schema.js'

	import { MenuItem } from '../../components/modules_menu/index.js'

	import VariableImageGrid from '../../components/VariableImageGrid.svelte'

	$: menu = _NEW_MENU_([]);

	let style;

	export let colour = 'inherit';
	export let centered = false;
	export let full = false;
	export let wide = false;
	export let data = _NEW_MENU_([]);
	import { onMount } from 'svelte';
	onMount(async () => {
		menu = { ...data };
		console.log(menu);
	});
	const order = [
		3,
		2,
		1
	]
	order.reverse();
</script>
<style>
	.section {
		background: #f5f5f5;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		width: 100%;
		display: grid;
	}

	.section.full {}

	.container {}

	.thin {
		border: none;
		height: 4px;
		width: 100%;
		border-radius: 3px;
		margin-left: 0px;
		color: var(--primary);
		background-color: var(--primary);
	}

	.thick {
		border: none;
		height: 4px;
		width: 250px;
		border-radius: 3px;
		margin-left: 0px;
		color: var(--primary);
		background-color: var(--primary);
	}

	p {
		pointer-events: none;
	}

	.h2 {
		width: 100%;
		text-align: left;
	}

	h4 {
		width: 100%;
		/* text-align: left; */
	}

	.image {
		padding: 1rem;
		margin: 1rem auto;
		background-repeat: no-repeat;
		background-size: fill;
		background-position: center;
	}

	.image.full {
		min-height: 15rem;
	}

	.center {
		text-align: center;
		width: 100%;
	}

	@media (max-width: 768px) {
		.image {
			min-height: 15rem;
			margin-top: 10rem;
		}
	}

	:global(.flex-row-container) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	:global(.flex-row-container>.flex-row-item) {


		/* single Column */
		/* flex: 1 1 100%;  */
		/* margin-bottom:2rem; */

		/* Double Column */
		flex: 1 1 33%; 
		margin:2rem;


		/* Double Column Center */
		/* flex: 1 1 33%;  */
		/* min-width:33%; */
		/* text-align: center;; */
		/* margin:2rem; */
		
		/* Triple Column Center */
		/* flex: 1 1 33%;  */
		/* min-width:30%; */
		/* text-align: center; */
		/* margin-bottom:2rem; */
		/* margin-top:2rem; */
		
		/* Quad Column Center */
		/* text-align: center;
		margin-bottom:2rem;
		margin-top:2rem;
		margin:1rem; */
		
		
		/* margin:2rem; */
		
		

		/* min-width:33%; */
		/*grow | shrink | basis */
		height: 100px;
	}

	:global(.flex-row-item) {
	}
</style>

<div class="flex-row-container">
	{#each menu.items as item (item.id)}
	{#if item.type == 'header'}
	<h4 id={item.slug}>{item.label}</h4>
	<hr class="thin" />
	{#each menu.items as item2 (item2.id)}
	{#if item2.category == item.label}
	<MenuItem data={item2} className="flex-row-item" />
	{/if}
	{/each}
	{/if}
	{/each}
</div>


<!-- <div class="col image" style={style}>
	<VariableImageGrid images={menu.images} />
</div> -->
<!-- <MediaQuery query={['(max-width: 768px)', '(min-width: 768px) and (max-width: 1280px)' , '(min-width: 1280px)' ]}
	let:matches>
	{@const [mobile, tablet, desktop] = matches}<br /><br />
	<section class="section" style={"background-color:"+colour}>
		<div class={"container "+(centered?'center':'')} style={"" + " order:" +order[0]}>
			<div class=" col w-50" style={"" + " order:" +order[0]}>

				<div class=" row">
					<h4 class="mdc-typography--headline4 ">
						{menu.title}
					</h4>
					<hr class={centered?"thin":"thick"} />
				</div>
				<div class="row">
					<h2 class={"mdc-typography--headline2 mk8-site-stroke-theme "+(centered?'center':'')}>
						{menu.subtitle}
					</h2>
				</div>
				<div class=" row">
						<div class="col  no-indent">
							<p contenteditable bind:innerHTML={menu.body}></p>
						</div>

				</div>
				<br /><br /><br /><br />
			</div>

		</div>

	</section><br /><br />
</MediaQuery> -->