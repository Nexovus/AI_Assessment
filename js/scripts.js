var eventsFilters = {
	archived: 'checked',
	name: '',
	location: '',
	lengthMin: 0,
	lengthMax: 8,
	costMin: 0,
	costMax: 500,
	sizeMin: 0,
	sizeMax: 1000
}

var preveiousFilters = {};

var eventsToRender = 6;

// Arrays of event details to select from
// since results must be generated here instead of fetched
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

var eventImages = [
	'./assets/event-1.png',
	'./assets/event-2.png'
];

// I hate to do this, but without actual requests to get seperate HTML templates I must use a string.
var eventTileHTML = '<div class="event-wrapper">' +
		'<a href="#">' +
			'<div class="event-container">' +
					'<div class="event-image-container">' +
						'<img src="{{image}}">' +
						'<div class="event-image-details">' +
							'<i class="fas fa-user"></i> {{director}} &#8226; {{duration}}' +
						'</div>' +
					'</div>' +
					'<div class="event-details">' +
						'<div class="event-title">' +
							'{{title}}' +
						'</div>' +
						'<div class="event-date-location">' +
							'{{date}} &#8226; {{location}}' +
						'</div>' +
					'</div>' +
			'</div>' +
		'</a>' +
	'</div>';


// Updating events starts here
function updateEventFilterVals() {
	if (eventsFilters === preveiousFilters) {
		return true;
	} else {
		preveiousFilters = eventsFilters;
		eventsFilters = {
			archived: $('.archived-radio:checked').attr('checked'),
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
	}
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
	// Simulate ajax response
	let earliestEventDate = new Date(1999, 0, 1);
	let latestEventDate = new Date(2142, 12, 31);

	let newEvents = [];

	// Checking for title matches
	let titleMatch = false;
	let allTitles = false;
	if (eventsFilters.title !== '') {
		$.each(eventTitles, function(i, val) {
			if (val.toLowerCase().indexOf(eventsFilters.title.toLowerCase()) >= 0) {
				titleMatch = true;
			}
		});
	} else {
		allTitles = true;
	}

	// Iterate filters and generate events accordingly
	if (!$.isEmptyObject({eventsFilters}) && (titleMatch || allTitles)) {
		for (let i = 0; i < eventsToRender; i++) {
			
			let newEvent = {};
			$.each(eventsFilters, function (key, val) {
				if (key == 'archived') {
					newEvent.date = generateDate({'date': val == 'checked' ? latestEventDate : earliestEventDate});
				} else if (key == 'title') {
					newEvent.title = generateTitle({'titleMatch': titleMatch, 'allTitles': allTitles});
				} else if (key =='location') {
					if (val == 'All') {
						newEvent.location = eventLocations[Math.floor(Math.random() * eventLocations.length)];
					} else {
						newEvent.location = val;
					}
					newEvent.image = eventImages[Math.floor(Math.random() * eventImages.length)];
				}
				newEvent.director = eventDirectors[Math.floor(Math.random() * eventDirectors.length)]
			});
			newEvents.push(newEvent);
		}
		// Json encode to make ajax response 'realistic'
		renderEvents({'newEvents': JSON.stringify(newEvents)});
	}
}

// Field generating functions for generateEvents()
function generateDate(params) {
	let currentDate = new Date();
	let startDate = params.date > currentDate ? currentDate : params.date;
	let endDate = params.date > currentDate ? params.date : currentDate;
	let newDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
	return newDate.toLocaleString('en-us', { month: 'long' }) + ' ' + newDate.getDay() + ', ' + newDate.getFullYear();
}

function generateTitle(params) {
	if (params.titleMatch) {
		var newTitle = $.grep(eventTitles, function(search) {
			return search.toLowerCase().indexOf(eventsFilters.title.toLowerCase()) > -1;
		});
	} else if (params.allTitles) {
		var newTitle = eventTitles[Math.floor(Math.random() * eventTitles.length)];
	}
	if (newTitle.length > 31) {
		newTitle = newTitle.substring(0, 31) + '...';
	}
	return newTitle;
}

// Render HTML blocks for generated events
function renderEvents(params) {
	let tilesHTML = '';
	let newEvents = JSON.parse(params.newEvents);
	newEvents.forEach(function (event) {
		let tileHTML = eventTileHTML;
		$.each(event, function (key, val) {
			tileHTML = tileHTML.replace('{{' + key + '}}', val);
		});
		tilesHTML += tileHTML;
	});
	$('#events-results').html($.parseHTML(tilesHTML));
}

// 'DocReady' / self executing function
$(function () {
	$('.site-nav a').each(function () {
		if ($(this).prop('href') == window.location.href) {
			$(this).addClass('active-link');
		}
	});
	// Update event section when filter inputs change
	$('.event-filter').change(function () {
		updateEventFilterVals();
	});
	// Update event selection on page load
	updateEventFilterVals();
});

