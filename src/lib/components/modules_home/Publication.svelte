<script>

	import MediaQuery from 'svelte-media-queries'
	import { _NEW_PUBLICATION_ } from '../../schema.js'

	import VariableImageGrid from '../../components/VariableImageGrid.svelte'

	$: publication = _NEW_PUBLICATION_([]); // = {};
	//import { _PUBLICATIONS } from '../stores/publications.js';

	let style;

	export let colour = 'inherit';
	export let centered = false;
	export let full = false;
	export let wide = false;
	export let data = _NEW_PUBLICATION_([]);
	import { onMount } from 'svelte';
	onMount(async () => {
		//console.log('test_publication', test_publication);
		publication = { ...data };
		console.log(data)
		style = " background-image: url('" + data.images[0] + "');"
		//console.log('publication', publication);
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
</style>
<!-- <div class="col image" style={style}>
	<VariableImageGrid images={publication.images} />
</div> -->
<MediaQuery query={['(max-width: 768px)', '(min-width: 768px) and (max-width: 1280px)' , '(min-width: 1280px)' ]}
	let:matches>
	{@const [mobile, tablet, desktop] = matches}<br /><br />
	<section class="section" style={"background-color:"+colour}>
		<div class={"container "+(centered?'center':'')} style={"" + " order:" +order[0]}>
			<div class=" col w-50" style={"" + " order:" +order[0]}>

				<div class=" row">
					<h4 class="mdc-typography--headline4 ">
						{publication.title}
					</h4>
					<hr class={centered?"thin":"thick"} />
				</div>
				<div class="row">
					<h2 class={"mdc-typography--headline2 mk8-site-stroke-theme "+(centered?'center':'')}>
						{publication.subtitle}
					</h2>
				</div>
				<div class=" row">
						<div class="col  no-indent">
							<p contenteditable bind:innerHTML={publication.body}></p>
						</div>
						<!-- <div class="col w-50 image" style={style}>

					</div> -->
				</div>
				<br /><br /><br /><br />
			</div>

			{#if (!full && (desktop||tablet))}
			<div class={"image full " + (wide?" w-100":"")} style={"overflow:scroll;" + " order:" +order[1]}>
				<VariableImageGrid images={publication.images} />
			</div>
			<!-- <div class="col image" style={style}>

		</div> -->
			{/if}
		</div>
		{#if (full || mobile )}
		<div class=" row" style={"overflow:scroll;max-height:1024px;" + " order:" +order[1]}>
			<!-- <div class={"image full " + (wide?" w-100":"")}> -->
			<!-- </div> -->
			<VariableImageGrid images={publication.images} />
			<!-- <div class="image full w-100" style={style}>

			</div> -->
		</div>
		{/if}
	</section><br /><br />
</MediaQuery>