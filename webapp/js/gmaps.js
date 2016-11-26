function loadMapsApi() {
    var p = document.location.protocol;
    var s = document.createElement('script');
    s.setAttribute('src', p + '//maps.googleapis.com/maps/api/js?key=AIzaSyDOf-gDXTDEamqvKeUe913CgCrHBJhtE7I&callback=mapScriptLoaded');
    s.setAttribute('async', '');
    s.setAttribute('defer', '');
    document.body.appendChild(s);
}

var map;
function mapScriptLoaded() {
    // JUST A CALLBACK
    var gpsLoc = {
        lat: 40.5941989,
        lng: -111.8592
    };

    map = new google.maps.Map(document.getElementById('map'), {
        center: gpsLoc,
        zoom: 12,
        disableDefaultUI:true,
        zoomControl: true
    });

}

function getAddressLatLng(address) {
    var mGeocoder = new google.maps.Geocoder();
    mGeocoder.geocode(
        {
            'address': address
        },
        function(results, status) {            
            if (status == 'OK') {

                if (results.length == 1) {
                    
                    // HAVE 1 RESULTS
                    getUserMarker(results[0].geometry.location);
                } else if (results.length > 1) {
                    // MORE THAN 1 RESULT        
                    getUserMarker(results[0].geometry.location);// FIX ME
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
    getAddressLatLng(addressStr);
}

// SHOW RESULTS AS MARKERS
var userMarker;// IMPORTANT
function getUserMarker(userLocationObj) {
    userMarker = new google.maps.Marker({
        position: userLocationObj,
        map: map,        
        title: 'Your Location',
        icon: {
            url: './images/car_marker.png',
            scaledSize: new google.maps.Size(25, 25)
        }
    });

    map.panTo(userLocationObj);

    var windowMarkup = "<div>Window here</div>";
    var infoWindow = new google.maps.InfoWindow({
        content: windowMarkup
    });
    userMarker.addListener('click', function() {
        map.setZoom(17);
        map.setCenter(this.position);
        infoWindow.open(map, userMarker);
    })

}