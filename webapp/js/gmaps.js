function loadMapsApi() {
    var p = document.location.protocol;
    var s = document.createElement('script');
    s.setAttribute('src', p + '//maps.googleapis.com/maps/api/js?key=AIzaSyDOf-gDXTDEamqvKeUe913CgCrHBJhtE7I&callback=mapScriptLoaded&libraries=geometry');
    s.setAttribute('async', '');
    s.setAttribute('defer', '');
    document.body.appendChild(s);
}

function loadMapsApiWithCurrentLoc() {
    var p = document.location.protocol;
    var s = document.createElement('script');
    s.setAttribute('src', p + '//maps.googleapis.com/maps/api/js?key=AIzaSyDOf-gDXTDEamqvKeUe913CgCrHBJhtE7I&callback=loadedMapsWithLoc&libraries=geometry');
    s.setAttribute('async', '');
    s.setAttribute('defer', '');
    document.body.appendChild(s);
}

function loadedMapsWithLoc() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successGetLoadinglocation, failGetLoadingLocation);
    }
}

function successGetLoadinglocation(position) {
    if (position.coords) {
        var location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        map = new google.maps.Map(document.getElementById('map'), {
            center: location,
            zoom: 12,
            disableDefaultUI: true,
            zoomControl: true
        });
        getUserMarker(location);

        // MAP EVENTS
        map.addListener('zoom_changed', function (e) {
            // DISTANCE INFO
            // FIX ME - TO DO
            var mapDist = google.maps.geometry.spherical.computeDistanceBetween(map.getBounds().getNorthEast(), map.getBounds().getSouthWest());
            var mapDistInMiles = mapDist * 0.000621371;
            var userRadius = mapDistInMiles / 2; // RADIUS      
            console.log('New Radius: ' + userRadius);
        });

        map.addListener('dragend', function (e) {
            // FIX ME - TO DO SOMETHING WITH INFO
            console.log(map.getCenter().lat() + ', ' + map.getCenter().lng());
        });
    }
}
function failGetLoadingLocation(error) {
    console.log(error);// FIX ME - ERROR HANDLING
}
var map;
function mapScriptLoaded() {
    var gpsLoc = {
        lat: 40.5941989,
        lng: -111.8592
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: gpsLoc,
        zoom: 12,
        disableDefaultUI: true,
        zoomControl: true
    });

    // MAP EVENTS
    map.addListener('zoom_changed', function (e) {
        // DISTANCE INFO
        // FIX ME - TO DO
        var mapDist = google.maps.geometry.spherical.computeDistanceBetween(map.getBounds().getNorthEast(), map.getBounds().getSouthWest());
        var mapDistInMiles = mapDist * 0.000621371;
        var userRadius = mapDistInMiles / 2; // RADIUS      
        console.log('New Radius: ' + userRadius);
    });

    map.addListener('dragend', function (e) {
        // FIX ME - TO DO SOMETHING WITH INFO
        console.log(map.getCenter().lat() + ', ' + map.getCenter().lng());
    });

}

function getAddressLatLng(address, callback) {
    var mGeocoder = new google.maps.Geocoder();
    mGeocoder.geocode(
        {
            'address': address
        },
        function (results, status) {
            if (status == 'OK') {

                if (results.length == 1) {
                    // HAVE 1 RESULTS
                    callback(results[0].geometry.location);
                } else if (results.length > 1) {
                    // MORE THAN 1 RESULT        
                    callback(results[0].geometry.location);// FIX ME handle multiple results
                } else {
                    // NO RESULTS
                    return null;
                }
            }
        }
    );

}

// GETS THE ADDRESS AS latlng
// MAY HAVE MULTIPLE RESULTS
function getModalAddress() {
    var addressLine1 = "",
        addressLine2 = "",
        city = "",
        state = "",
        zip = "";

    addressLine1 = $('.txb-address-line1').val();
    addressLine2 = $('.txb-address-line2').val();
    city = $('.txb-city').val();
    state = $('.state-item.selected').html();
    zip = $('.txb-zip').val();

    var addressStr = "";
    addressStr += addressLine1 + ' ';
    addressStr += addressLine2 + ' ';
    addressStr += city + ' ';
    addressStr += state + ' ';
    addressStr += zip + ' ';

    // GET ADDRESS    
    var addressLatLng = getAddressLatLng(addressStr, getUserMarker);
}

// SHOW RESULTS AS MARKERS
var userMarker;// IMPORTANT
function getUserMarker(userLocationObj) {
    userMarker = new google.maps.Marker({
        position: userLocationObj,
        map: map,
        title: 'Your Location'
    });

    map.panTo(userLocationObj);

    var windowMarkup = "<div>Window here</div>";
    var infoWindow = new google.maps.InfoWindow({
        content: windowMarkup
    });
    userMarker.addListener('click', function () {
        map.setZoom(17);
        map.setCenter(this.position);
        infoWindow.open(map, userMarker);
    })

}