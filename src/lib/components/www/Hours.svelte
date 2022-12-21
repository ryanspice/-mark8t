<script>
	import { opening_hours } from "../../../stores.js";
	let storedHours = [];
	let hours = [];

	opening_hours.subscribe(async (value) => {
		storedHours = value.weekday_text;
		hours =
			storedHours?.map((day, index) => {
				let _hours = day.split(": ")[1];
				_hours = _hours.replace(":00", "");
				_hours = _hours.replace(":00 p.m", "");
				_hours = _hours.replace(":00 a.m", "");
				_hours = _hours.replace(".", "");
				_hours = _hours.replace("", "");
				_hours = _hours.replace(" pm.", "");
				_hours = _hours.replace(".", "");
				return {
					day: day.split(": ")[0].slice(0, 3),
					hours: _hours,
				};
			}) || storedHours;
		// merge hours objects with same hours value
		hours =
			hours?.reduce((acc, current) => {
				const x = acc.find((item) => item.hours === current.hours);
				if (!x) {
					return acc.concat([current]);
				} else {
					x.day = x.day + ", " + current.day;
					return acc;
				}
			}, []) || [];
	});
</script>

<div>
	{#each hours as { day, hours }}
		<div style="text-align:center;">
			<div class="row">
				<div class="col text-end px-1">
					{day}
				</div>
				<div class="col text-start px-1 bold">
					{hours}
				</div>
			</div>
		</div>
	{/each}
</div>
