<script>
	import { onMount } from "svelte";
	import View from "./View.svelte";
	import DynamicForm from "./form/DynamicForm.svelte";

	import Menu from '@smui/menu';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';

	let menu;
	let clicked = 'nothing yet';

	export let account;
	const username = account.name || 'Admin';
	const usernameInititals = username?.split(" ")?.map(word => word[0])?.join("") || '';

	$: account = {};
	$: website = {};
	import { _API_STORE_ACCOUNT_, _API_STORE_WEBSITE_, _API_STORE_PRODUCTS_, _API_STORE_GOOGLE_ } from '../stores.js';
	_API_STORE_ACCOUNT_.subscribe(value => {
		account = value || [];
	});
	_API_STORE_WEBSITE_.subscribe(value => {
		website = value || {};
	});

	let people = [
		{ first: 'Hans', last: 'Emil' },
		{ first: 'Max', last: 'Mustermann' },
		{ first: 'Roman', last: 'Tisch' }
	];

	let prefix = '';
	let first = '';
	let last = '';
	let i = 0;

	$: filteredPeople = prefix
		? people.filter(person => {
			const name = `${person.last}, ${person.first}`;
			return name.toLowerCase().startsWith(prefix.toLowerCase());
		})
		: people;

	$: selected = filteredPeople[i];

	$: reset_inputs(selected);

	function create() {
		people = people.concat({ first, last });
		i = people.length - 1;
		first = last = '';
	}

	function update() {
		selected.first = first;
		selected.last = last;
		people = people;
	}

	function remove() {
		// Remove selected person from the source array (people), not the filtered array
		const index = people.indexOf(selected);
		people = [...people.slice(0, index), ...people.slice(index + 1)];

		first = last = '';
		i = Math.min(i, filteredPeople.length - 2);
	}

	function reset_inputs(person) {
		first = person ? person.first : '';
		last = person ? person.last : '';
	}

	onMount(() => {

	});
</script>
<style>
	button {
		margin-right: 1.25rem;
	}

	.user-name-circle {
		padding: 0px;
		margin: -5px;
		margin-left: 0.5rem;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background-color: #fff;
		border: 2px solid #000;
		display: inline-block;
		text-align: center;
		line-height: 34px;
		font-size: 20px;
		color: #000;
	}

	* {
		font-family: inherit;
		font-size: inherit;
	}

	input {
		display: block;
		margin: 0 0 0.5em 0;
	}

	select {
		float: left;
		margin: 0 1em 1em 0;
		width: 14em;
	}

	.buttons {
		clear: both;
	}
</style>
<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
	<a class="navbar-brand" href="/">{website?.siteName}</a>
	<div class="btn-group ml-auto dropleft">
		<!-- <button type="button" id="signIn" class="btn btn-secondary" onclick="window.signIn()">Sign-in</button> -->
		<button type="button" id="signOut" class="btn btn-primary" on:click={()=> menu.setOpen(true)}>
			<span>{username}</span>
			<h5 id="label" class="user-name-circle">{usernameInititals || ""}</h5>
		</button>
		<Menu bind:this={menu} style="margin-top:46px;">
			<List>
				<Item on:SMUI:action={window.localStorage.clear}>
					<Text>Clear Cache</Text>
				</Item>
				<Separator />
				<Item on:SMUI:action={window.signOut}>
					<Text>Logout</Text>
				</Item>
			</List>
		</Menu>
	</div>
</nav>

<View>
	<div class="container">
		<h1></h1>
		<DynamicForm />

		<section hidden>
			<input placeholder="filter prefix" bind:value={prefix}>
			<select bind:value={i} size={5}>
				{#each filteredPeople as person, i}
				<option value={i}>{person.last}, {person.first}</option>
				{/each}
			</select>
			<label><input bind:value={first} placeholder="first"></label>
			<label><input bind:value={last} placeholder="last"></label>
			<div class='buttons'>
				<button on:click={create} disabled="{!first || !last}">create</button>
				<button on:click={update} disabled="{!first || !last || !selected}">update</button>
				<button on:click={remove} disabled="{!selected}">delete</button>
			</div>
		</section>
	</div>
</View>