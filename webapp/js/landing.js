import React from 'react';
import { render } from 'react-dom';
import { LandingNav } from '../../build';

window.onload = function () {
    loadFB();
    event_input();

    $('.btn-input-search').click(function () {
        //handleSearch(0,false);
    });

}
window.fbAsyncInit = function () {
    initFB();
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
                            <LandingNav isAutho={true} user={user} />
                        ),
                        document.getElementById('landing-nav')
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
                    <LandingNav isAutho={false} />
                ),
                document.getElementById('landing-nav')
            );
            break;
    }
}


// INPUT EVENTS
function event_input() {
    $('.input-search').on('keypress', function (e) {
        var txbSearch = $(this);
        var txbVal = txbSearch.val();
        if ((e.keyCode == '13') && (txbVal != '')) {
            console.log(txbVal);
            // CALL SERVICE TO QUERY ADDRESS LOCATION OBJ
            getAddressLatLng(txbVal, locationSearchCallback);
        }
    });
}

function locationSearchCallback(result) {
    console.log(result);
}