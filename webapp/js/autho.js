window.onload = function () {

    $('.btn-login').click(function () {
        var un = $('.input-login').val();
        var pw = $('.input-pw').val();
        login(un, pw);
    });
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
    ).done(function (result) {
        console.log(result);
        switch (result) {
            case "UNCONFIRMED":
                // SEND TO CONFIRMATION PAGE
                //console.log('UNCONFIRMED');
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
                    var _sessionHelper = new SessionHelper();
                    _sessionHelper.setToke(toke);                   
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
