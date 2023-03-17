<script defer>
	import { onMount } from "svelte";

	import { opening_hours, place, isOpen } from "../../store/stores.js";
	import Hours from "./Hours.svelte";
	import Address from "../Address.svelte";

	import { _GOOGLE_MAP_API_URL_ } from "../../store/stores.js";
	import { fetchJSONP, viewport } from "../../utils";

	import getObject from "../../utils/storage/storage.getobject";
	import setObject from "../../utils/storage/storage.setobject";

	export let height;
	let zoom = 19;
	let initialized = false;

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
	const initMap = () => {
		var map = new google.maps.Map(document.getElementById("map"), {
			center: { lat: -33.866, lng: 151.196 },
			zoom: zoom,
			mapId: "5a287367f633f4e2",
		});

		var service = new google.maps.places.PlacesService(map);

		service.getDetails(
			{
				placeId: localStorage.getObject("--store-google").placeId,
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
					setObject("place", place, 60);
				}
			}
		);
	};

	//
	const init = () => {
		let url;
		_GOOGLE_MAP_API_URL_.subscribe((value) => {
			url = value;
			fetchJSONP(url);
		});
	};

	//
	const handleEnterViewport = () => {
		if (!initialized) {
			init();
			initialized = true;
		}
	};

	//
	onMount(() => {
		let place = getObject("place") === "place" ? false : getObject("place");
		if (place.opening_hours) {
			updateHours(place.opening_hours);
			updatePlace(place);
		} else {
		}
		window.initMap = initMap;
		init();
	});
</script>

<section
	id="section__map"
	use:viewport
	on:enterViewport={handleEnterViewport}
	on:exitViewport={() => {}}
>
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
		background-image: url("map.png");
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
