var data = {
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

function getEvents(params) {
    $.ajax({
        type: 'GET',
        url: '#',
        data: data
    })
}

function generateEvents(params) {

}

function updateEvents(params) {
    
}

// 'DocReady / self executing function'
$(function () {
    $('.site-nav a').each(function () {
        if ($(this).prop('href') == window.location.href) {
            $(this).addClass('active-link');
        }
    })
    getEvents();
});