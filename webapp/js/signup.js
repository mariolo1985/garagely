import React from 'react';
import { render } from 'react-dom';
import { Nav } from '../../build';

/* TO DO
    - HANDLE USERNAME TAKEN, BAD PW..ETC ERRORS 
*/
window.onload = function () {
    loadFB();
    // EVENTS
    event_input();
    event_btnsignup();

    $('.btn-cancel').click(function () {
        window.location = '../';
    });


    $('.btn-fb-connect').click(function () {
        FB.login(function (signupResults) {
            console.log(signupResults);
            if (signupResults.authResponse) {
                console.log("autho'd app");
                $.ajax({
                    url: '../facebook/user.php',
                    type: 'POST',
                    data: {
                        Filter: 'SET_TOKEN_FROM_JS'
                    }
                }).done(function (result) {
                    if (result != 'ERROR') {
                        console.log(result);
                    } else {

                    }
                });
            } else {
                console.log('Cancel');

            }
        },
            {
                scope: 'public_profile,email'
            });
    });
}


// ON FB SCRIPT LOAD
window.fbAsyncInit = function () {
    initFB();// init fb api
    getFBStatus(checkLoadingStatus);
};

function checkLoadingStatus(loginStatus) {
    console.log('Loading Status: ');
    console.log(loginStatus);
    switch (loginStatus.status) {
        case "connected":
            // REDIRECT TO MAPS
            //window.location = '../map';
            break;

        default:
            // NOT AUTHO OR NOT CONNECTED 

            break;
    }
}

function event_input() {
    $('.input-login').on('keypress', function (e) {
        var thisTxb = $(this);
        if (thisTxb.val() != "") {
            // NOT EMPTY - CHECK IF PREVIOUSLY ERROR            
            if (thisTxb.parents('.input-row').hasClass('error')) {
                thisTxb.parents('.input-row').removeClass('error');
            }
        }
        // HANDLE ENTER PRESS
        if (e.keyCode == '13') {
            initSignup();
        }
    });
}

function event_btnsignup() {
    $('.btn-signup').click(function () {
        initSignup();
    });
}

function initSignup() {
    var inputUsername = $('.input-username'),
        un = inputUsername.val();
    var inputPw = $('.input-pw'),
        pw = inputPw.val();
    var inputEmail = $('.input-email'),
        email = inputEmail.val();
    var allErrorInputs = $('.input-login.error');

    if (allErrorInputs.length > 0) {
        allInputs.removeClass('error');
    }
    // VALIDATE TEXTBOX
    var hasUn = un != "" ? true : false;
    var hasPw = pw != "" ? true : false;
    var hasEmail = email != "" ? true : false;

    if ((hasUn) && (hasPw) && (hasEmail)) {
        signUp(un, pw, email);
    } else {
        // missing        
        if (!hasUn) {
            inputUsername.parents('.input-row').addClass('error');
        }
        if (!hasPw) {
            inputPw.parents('.input-row').addClass('error');
        }
        if (!hasEmail) {
            inputEmail.parents('.input-row').addClass('error');
        }
    }

}

function signUp(username, pw, email) {
    startLoader();
    $.ajax(
        {
            type: "POST",
            url: "../cognitoservice/createuser.php",
            data:
            {
                un: username,
                pw: pw,
                email: email
            }
        }
    ).done(function (result) {

        if (result == "EmailExistException") {
            console.log('Email Already Exist');
        } else if (result == "UsernameExistsException") {
            console.log('User Name taken!');
        } else if (result == "InvalidPasswordException") {
            console.log('incorrect password strings');
        } else {
            var jResult = JSON.parse(result);
            if (jResult['DeliveryMedium'] === "EMAIL") {
                window.location = '../';
            }
        }
        stopLoader();
    })
        .fail(function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
            stopLoader();
        });
}


function startLoader() {
    $('.loader').removeClass('hide').addClass('show');
}

function stopLoader() {
    $('.loader').removeClass('show').addClass('hide');
}


// RENDERS
