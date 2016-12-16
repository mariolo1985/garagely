import React from 'react';
import { render } from 'react-dom';
import { Nav } from '../../build';


window.onload = function () {
    loadFB();
    // EVENTS
    event_input();
    event_btnlogin();

    $('.btn-cancel').click(function () {
        window.location = '../';
    });

}

// ON FB SCRIPT LOAD
window.fbAsyncInit = function () {
    initFB();// init fb api
    // FIX ME - SEE IF ALREADY LOGGED INTO FB 

    //BUT FOR NOW ---->
    getFBStatus(checkLoadingStatus)
};

function checkLoadingStatus(loginStatus) {
    console.log('Loading Status: ' + loginStatus);
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
                    // REDIRECT TO MAPS
                }
            }).fail(function (a, b, c) {
                console.log(a);
                console.log(b);
                console.log(c);
            });

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
            initLogin();
        }
    });
}

function event_btnlogin() {
    $('.btn-login').click(function () {
        initLogin();
    });

    $('.btn-fb-connect').click(function () {
        // FIX ME - FAIL REDIRECT URL
        fbLogin(true, '../map', false, '');
    });
}

function initLogin() {
    var inputUn = $('.input-login'),
        un = inputUn.val();
    var inputPw = $('.input-pw'),
        pw = inputPw.val();

    var hasUn = un != "" ? true : false;
    var hasPw = pw != "" ? true : false;

    if ((hasUn) && (hasPw)) {
        login(un, pw);
    } else {
        // VALIDATE TXB
        if (!hasUn) {
            inputUn.parents('.input-row').addClass('error');
        }
        if (!hasPw) {
            inputPw.parents('.input-row').addClass('error');
        }
    }
}

function login(username, pw) {
    //startLoader();
    $.ajax(
        {
            type: "POST",
            url: "../cognitoservice/authouser.php",
            data:
            {
                un: username,
                pw: pw
            }
        }
    ).done(function (result) {
        console.log(result);
        switch (result) {
            case "UNCONFIRMED":
                // SEND TO CONFIRMATION PAGE
                window.location = '../confirmcode';
                break;

            case "NOT_AUTHO":
                // BAD PW
                console.log('bad pw');
                break;

            default:
                var jResult = JSON.parse(result);
                var toke = jResult['AccessToken'];
                if (typeof (toke) != 'undefined') {
                    // SAVE toke
                    window.location = '../';
                    setToke(toke);
                }

                break;

        }


        stopLoader();
    })
        .fail(function (a, b, c) {
            stopLoader();
            console.log(a);
            console.log(b);
            console.log(c);
        });
}

function startLoader() {
    $('.loader').removeClass('hide').addClass('show');
}

function stopLoader() {
    $('.loader').removeClass('show').addClass('hide');
}

//  RENDERS
