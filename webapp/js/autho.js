import React from 'react';
import { render } from 'react-dom';
import { Nav } from '../../build';


window.onload = function() {
    // EVENTS
    event_input();
    event_btnlogin();

    $('.btn-cancel').click(function() {
        window.location = '../';
    });

}
function event_input() {
    $('.input-login').on('keypress', function(e) {
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
    $('.btn-login').click(function() {
        initLogin();
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
            url: "http://54.201.24.33/cognitoservice/authouser.php",
            data:
            {
                un: username,
                pw: pw
            }
        }
    ).done(function(result) {
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
        .fail(function(a, b, c) {
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
render(
    (
        <Nav/>
    ),
    document.getElementById('main-nav')
)