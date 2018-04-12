import React from 'react';
import { render } from 'react-dom';
import { Nav } from '../../build';


window.onload = function () {
    try {
        // LOAD FB
        loadFB();

        handleToke(showAddressModal);// HANDLE TOKEN
        loadMapsApiWithCurrentLoc();

        $('.btn-search-map').click(function () {
            var address = $('.txb-search').val();
            var latLng = getAddressLatLng(address, getUserMarker);

        });

    } catch (e) {
        console.log(e);
    }
}


// FACEBOOK
window.fbAsyncInit = function () {
    initFB();

    // CHECK IF FB IS SIGNED IN 
    getFBStatus(checkLoadingStatus);

}

function checkLoadingStatus(loginStatus) {
    console.log('Loading Status: ');
    console.log(loginStatus);
    switch (loginStatus.status) {
        case "connected":
            // NEED TO CALL FACEBOOK SERVICE
            $.ajax({
                url: '../facebook/user.php',
                type: 'POST',
                data: {
                    Filter: 'SET_TOKEN_FROM_JS'
                }
            }).done(function (result) {
                console.log('SET TOKE RESULT: ' + result);
                if (result != 'ERROR') {
                    // HAVE USER JSON
                    var user = buildFBUserObj(result);
                    // CONNECTED
                    render(
                        (
                            <Nav isAutho={true} user={user} />
                        ),
                        document.getElementById('main-nav')
                    );
                }
            }).fail(function (a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            });

            break;

        default:
            // NOT AUTHO OR NOT CONNECTED 
            render(
                (
                    <Nav isAutho={false} />
                ),
                document.getElementById('main-nav')
            );
            break;
    }
}

function showAddressModal(hasAddress) {
    // CHECK IF WE HAVE USER ADDRESS
    if (!hasAddress) {
        // PROMPT FOR ADDRESS
        $('.settings-container').addClass('open');
    }
    // add btn LISTENER
    $('.btn-check-address').click(function () {
        var markLocation = getModalAddress();
    });

}