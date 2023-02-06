<script defer>
	import { onMount } from "svelte";

	import { opening_hours, place, isOpen } from "../../stores.js";
	import Hours from "./Hours.svelte";
	import Address from "../Address.svelte";

	const fetchJSONP = (url) => {
		return new Promise((resolve, reject) => {
			const script = document.createElement("script");
			script.src = url;
			script.onload = () => {
				resolve(window.data);
				window.data = undefined;
			};
			script.onerror = (error) => {
				reject(error);
			};
			document.head.appendChild(script);
		});
	};

	export let height;
	let zoom = 19;

	//
	const updateHours = (value) => {
		opening_hours.update((h) => value);
	};

	//
	const updatePlace = (value) => {
		place.update((h) => value);
		isOpen.update((h) => value.opening_hours.open_now);
	};

	//
	const handleResize = (event) => {};

	//
	const initMap = () => {
		var map = new google.maps.Map(document.getElementById("map"), {
			center: { lat: -33.866, lng: 151.196 },
			zoom: zoom,
			mapId: "5a287367f633f4e2",
		});

		var service = new google.maps.places.PlacesService(map);

		service.getDetails(
			{
				placeId: "ChIJw69pYAvyLogR-b1OU0JnnAw",
			},
			function (place, status) {
				if (status === google.maps.places.PlacesServiceStatus.OK) {
					var marker = new google.maps.Marker({
						map: map,
						position: place.geometry.location,
					});
					map.setCenter(place.geometry.location);
					updateHours(place.opening_hours);
					updatePlace(place);
					localStorage.setObject("place", place);
				}
			}
		);
	};

	import { _GOOGLE_MAP_API_URL_ } from "../../stores.js";
	//
	onMount(() => {
		window.initMap = initMap;

		let url;
		_GOOGLE_MAP_API_URL_.subscribe((value) => {
			url = value;
			fetchJSONP(url);
		});
	});
</script>

<svelte:window on:resize={handleResize} />

<section id="section__map">
	<h2>where are we</h2>
	<br />
	<h1>
		<Address />
	</h1>
	<h3 />
</section>
<div id="map" />

<style>
	#map {
		width: 100vw;
		margin: 0px;
		padding: 0px;
		max-height: 100vh;
		height: 756px;
		opacity: 1;
		padding-bottom: 1rem;
		//background-image: url('map.png');
	}

	h1 {
		font-weight: bold;
		width: 100%;
		text-align: center;
		margin-bottom: 0.5rem;
	}

	h2 {
		width: 100%;
		text-align: center;
		font-weight: lighter;
		margin-bottom: -30px;
		padding-top: 3rem;
	}

	h3 {
		width: 100%;
		text-align: center;
		margin-bottom: 4rem;
	}

	section {
		//background: black;
	}

	section,
	iframe {
		overflow: hidden !important;
	}

	:global(#section__map) {
		background: transparent;
	}

	#section__map {
		padding-top: 168px;
		padding-bottom: 168px;
	}
</style>
