var eventsFilters = {
	archived: 0,
	name: '',
	location: '',
	lengthMin: 0,
	lengthMax: 8,
	costMin: 0,
	costMax: 500,
	sizeMin: 0,
	sizeMax: 1000
}

var eventsToRender = 6;

function updateEventFilterVals() {
	eventsFilters = {
		archived: $('#event-archived-future').attr('checked'),
		title: $('#event-title').val(),
		location: $('#event-location').val(),
		lengthMin: $('#event-length-min').val(),
		lengthMax: $('#event-length-max').val(),
		costMin: $('#event-cost-min').val(),
		costMax: $('#event-cost-max').val(),
		sizeMin: 0,
		sizeMax: 1000
	}
	getEvents();
};


function getEvents() {
	$.ajax({
		type: 'GET',
		url: '#',
		data: eventsFilters,
		success: function(response) {
			// Normally, we handle further processing here
		},
		error: function() {
			// Instead, we will spoof it here
			generateEvents();
		}
	})
}

function generateEvents() {
	// Simulate ajax response object

	// Arrays of event details to select from
	var eventDirectors = [
		'Jane Doe',
		'Eric Chan',
		'Jerry Head',
		'Ryan Bruzan',
		'William Shatner',
		'Ice-T',
		'Jean-Luc Picard'
	];

	var eventTitles = [
		'Apple Keynote',
		'Basic Title that Truncates When it lists PI to the 100th digit, like so: 3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679',
		'Node, NPM, and You',
		'Facebook Developer Conference',
		'Is Alexa Plotting Against Me?',
		'Why Vikings is a Great Show'
	];

	var eventLocations = [
		'Atlanta, GA',
		'Coolray Field',
		'SunTrust Plaza',
		'Peachtree Tower',
		'Reno, CA',
		'Rainbowland'
	];

	var earliestEventDate = new Date(1999, 0, 1);
	var latestEventDate = new Date(2142, 12, 31);

	var newEvents = {};
	if (!$.isEmptyObject({eventsFilters})) {
		for (var i = 0; i < eventsToRender; i++) {
			var newEvent = {};
			$.each(eventsFilters, function (key, val) {
				if (key == 'archived') {
					newEvent.date = generateDate(val == 'checked' ? latestEventDate : earliestEventDate);
				} else if (key == 'title') {

				}
			});
		}
		// Json encode to make ajax response 'realistic'
	}
}

function generateDate(params) {
	
}

function renderEvents(params) {

}



// 'DocReady' / self executing function
$(function () {
	$('.site-nav a').each(function () {
		if ($(this).prop('href') == window.location.href) {
			$(this).addClass('active-link');
		}
	})
	// update event selection on page load
	updateEventFilterVals();
});