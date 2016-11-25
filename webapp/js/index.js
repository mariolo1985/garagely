//import React from 'react';
//import { render } from 'react-dom';
//import { Modal, ModalHead, ModalBody, ModalFooter } from '../../build';


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
    $('.btn-save-addres').click(function() {
        var markLocation = getModalAddress();
    });


}