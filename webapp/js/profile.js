import React from 'react';
import { render } from 'react-dom';
import { Nav } from '../../build';

var _address;
window.onload = function () {
    loadMapsApi();
    $('.btn-update-address').click(function () {

        var address = getAddress();
        if (address.Status == "ERROR") {
            // RAISE ERROR
            initUpdateAddress(); //fix me
        } else {
            // MAPS
            initUpdateAddress();
        }

    });
}

function getAddress() {

    var address = {
        Status: "",
        AddressLine1: "",
        AddressLine2: "",
        City: "",
        State: "",
        Zip: ""
    };
    var hasEmpty = false;

    var line1 = $('.txb-address-line1').val();
    if (line1 != "") {
        address.AddressLine1 = line1;
    } else {
        hasEmpty = true;
    }

    var line2 = $('.txb-address-line2').val();
    if (line2 != "") {
        address.AddressLine2 = line2;
    }

    var city = $('.txb-city').val();
    if (city != "") {
        address.City = city;
    } else {
        hasEmpty = true;
    }

    // HANDLE STATE 
    var state = "";// FIX ME
    if (state != "") {
        address.State = state;
    } else {
        hasEmpty = true;
    }

    var zip = $('.txb-zip').val();
    if (zip != "") {
        address.Zip = zip;
    } else {
        hasEmpty = true;
    }

    // EMPTY CHECK
    if (hasEmpty) {
        address.Status = "ERROR";
    } else {
        address.Status = "SUCCESS";
    }

    _address = address;
    return address;
}

function setGeo(geometry) {
    console.log(geometry);
    //if (geometry)
}

function initUpdateAddress() {
    if (google != null) {
        var addressObj = _address;
        getAddressLatLng(addressObj, setGeo);
    }
}

function loadMapsApi() {
    var p = document.location.protocol;
    var s = document.createElement('script');
    s.setAttribute('src', p + '//maps.googleapis.com/maps/api/js?key=AIzaSyDOf-gDXTDEamqvKeUe913CgCrHBJhtE7I');
    s.setAttribute('async', '');
    s.setAttribute('defer', '');
    document.body.appendChild(s);
}

function getAddressLatLng(address, callback) {
    var addressStr = address.AddressLine1 + " " + address.AddressLine2 + " " + address.City + " " + address.State + " " + address.Zip;

    var mGeocoder = new google.maps.Geocoder();
    mGeocoder.geocode(
        {
            'address': addressStr
        },
        function (results, status) {
            switch (status) {
                case "OK":
                    callback(results);
                    break;

                case "ZERO_RESULTS":
                    break;

                default:
                    // ERROR LOGGING WITH STATUS
                    break;
            }
        }
    );

}