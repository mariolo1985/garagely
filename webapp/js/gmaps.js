//AIzaSyCKDC3HPE7EOYsOSclRHBwOiV2Z-9rfocg

function loadMapsApi() {
    var p = document.location.protocol;
    var s = document.createElement('script');
    s.setAttribute('src', p + '//maps.googleapis.com/maps/api/js?key=AIzaSyCKDC3HPE7EOYsOSclRHBwOiV2Z-9rfocg&callback=initMap');
    s.setAttribute('async', '');
    s.setAttribute('defer', '');
    document.body.appendChild(s);
}

var map;
function initMap() {
    var latlng = {
        lat: 40.5941989,
        lng: -111.8592
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: latlng,
        zoom: 12
    });

}
