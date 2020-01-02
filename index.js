let currentDate = null;

let difficultiy;

const monthNames = [
	'January', 'February', 'March',
	'April', 'May', 'June', 'July',
	'August', 'September', 'October',
	'November', 'December'
];

const weekDayNames = [
	'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const randomDate = (start, end) => {
	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const difficulties = [
	{start: new Date(new Date().getFullYear(), 0, 1), end: new Date(new Date().getFullYear(), 11, 31)},
	{start: new Date(new Date().getFullYear(), 0, 1), end: new Date(new Date().getFullYear() + 1, 11, 31)},
	{start: new Date(2000, 0, 1), end: new Date(2099, 11, 31)},
	{start: new Date(1900, 0, 1), end: new Date(2099, 11, 31)},
	{start: new Date(1600, 0, 1), end: new Date(2099, 11, 31)},
	{start: new Date(100, 0, 1), end: new Date(2999, 11, 31)}
];

const getRandomDateByDifficulty = () => {
	return randomDate(difficulties[difficultiy - 1].start, difficulties[difficultiy - 1].end);
};

const dateToString = (d) => {
	return d.getDate() + ' ' + monthNames[d.getMonth()] + ' ' + d.getFullYear();
};

const alertCorrect = document.getElementById('alertCorrect');
const alertWrong = document.getElementById('alertWrong');
const dateSpan = document.getElementById('dateSpan');
const nextButton = document.getElementById('next');
const dayOptionsContainer = document.getElementById('day-options-container');

const weekDayButtons = [
	document.getElementById('btnSunday'),
	document.getElementById('btnMonday'),
	document.getElementById('btnTuesday'),
	document.getElementById('btnWednesday'),
	document.getElementById('btnThursday'),
	document.getElementById('btnFriday'),
	document.getElementById('btnSaturday')
];

const ask = (diff) => {
	difficultiy = diff;
	document.getElementById('container-level-choice').style.display = 'none';
	document.getElementById('container-ask').style.display = 'block';
	refresh();
};

const refresh = () => {
	alertCorrect.style.display = 'none';
	alertWrong.style.display = 'none';
	dayOptionsContainer.classList.remove("result-alert-shown");
	currentDate = getRandomDateByDifficulty();
	dateSpan.innerHTML = dateToString(currentDate);
};

const checkAnswer = (ans) => {
	for (const b of weekDayButtons) {
		b.setAttribute('disabled', 'true');
	}
	nextButton.style.display = 'inline';
	nextButton.focus();
	if (ans === currentDate.getDay()) {
		alertCorrect.innerHTML = `<span style="font-size: 2.7em;">&#9989;</span><br />Correct!<br />
    Answer: ${ weekDayNames[ans] }`;
		alertCorrect.style.display = 'block';
	} else {
		alertWrong.innerHTML = `<span style="font-size: 2.7em;">&#10060;</span><br />Wrong!<br />
    Date: ${ dateToString(currentDate) },<br />
    Your answer: ${ weekDayNames[ans] },<br />
    Correct answer: ${ weekDayNames[currentDate.getDay()] }`;
		alertWrong.style.display = 'block';
	}
	dayOptionsContainer.classList.add("result-alert-shown");
};

for (let i = 0; i < weekDayButtons.length; i++) {
	weekDayButtons[i].addEventListener('click', () => {
		checkAnswer(i);
	});
}

nextButton.addEventListener('click', () => {
	for (const b of weekDayButtons) {
		b.removeAttribute('disabled');
	}
	nextButton.style.display = 'none';
	refresh();
});

window.addEventListener('keydown', (keyEvent) => {
	if (!isNaN(keyEvent.key)) {
		const number = parseInt(keyEvent.key);
		if (number <= 7) {
			checkAnswer(number % 7);
		}
	}
});
