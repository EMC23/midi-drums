p5.midi.onInput = function(event) {

	var type = event.data[0];
	var position = event.data[1];
	var value = event.data[2];

	//console.log('type: ' + type);
	//console.log('position: ' + position);
	console.log('value: ' + value);

	// CLOCK DEMO (big thanks to wes bos and Javascript30 for the inspiration!🎉) https://github.com/wesbos/JavaScript30/tree/master/02%20-%20JS%20and%20CSS%20Clock)

	const SECONDS_ON_FACE = 60
	const MINUTES_ON_FACE = 60
	const HOURS_ON_FACE = 12
	const DEGS_IN_CIRCLE = 360
	const DEGS_PER_MINUTE = DEGS_IN_CIRCLE / MINUTES_ON_FACE
	const DEGS_PER_HOUR = DEGS_IN_CIRCLE / HOURS_ON_FACE
	const midi = 127

	function renderClock(date) {
		const clock = document.querySelector(`.js--clock .clock`)
		const clockSolid = document.querySelector(`.js--clock .clock.solid`)
		//const [hour, mins, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()]
		const [hour, mins, seconds] = [date.getHours(), date.getMinutes(), value]

		const secondsDegrees = ((seconds / midi) * DEGS_IN_CIRCLE - 90)
		const minsDegrees = ((mins / MINUTES_ON_FACE) * DEGS_IN_CIRCLE) + ((seconds / SECONDS_ON_FACE)*DEGS_PER_MINUTE) + 90
		const hourDegrees = ((hour / HOURS_ON_FACE) * DEGS_IN_CIRCLE) + ((mins / MINUTES_ON_FACE)*DEGS_PER_HOUR) + 90

		//console.log('secondsDegrees: ' + secondsDegrees);

		clock.querySelector(`.js--second-hand`).style.transform = `rotate(${secondsDegrees}deg)`
		clockSolid.querySelector(`.js--second-hand`).style.transform = `rotate(${secondsDegrees}deg)`
		//clock.querySelector(`.js--min-hand`).style.transform = `rotate(${minsDegrees}deg)`
		//clock.querySelector(`.js--hour-hand`).style.transform = `rotate(${hourDegrees}deg)`
		clock.style.setProperty(`--second-degrees`, secondsDegrees - 90)
		clockSolid.style.setProperty(`--second-degrees`, secondsDegrees - 90)

	}

	//setInterval(() => renderClock(new Date), 1000)
	renderClock(new Date)

}
