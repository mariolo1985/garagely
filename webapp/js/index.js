import React from 'react';
import { render } from 'react-dom';
import { Nav } from '../../build';


window.onload = function() {
    try {
        handleToke(showAddressModal);
        loadMapsApi();

    } catch (e) {
        console.log(e);
    }
}

function showAddressModal(hasAddress) {
    // CHECK IF WE HAVE USER ADDRESS
    if (!hasAddress){
        // PROMPT FOR ADDRESS
        $('.settings-container').addClass('open');
    }
    // add btn LISTENER
    $('.btn-check-address').click(function() {
        var markLocation = getModalAddress();
    });

}

render(
    (
        <Nav/>
    ),
    document.getElementById('main-nav')
)