window.onload = function () {

    $('.btn-signup').click(function () {
        var un = $('.input-login').val();
        var pw = $('.input-pw').val();
        var email = $('.input-email').val();
        signUp(un, pw, email);
    });
}

function signUp(username, pw, email) {
    startLoader();
    $.ajax(
        {
            type: "POST",
            url: "http://54.201.24.33/cognitoservice/createuser.php",
            data:
            {
                un: username,
                pw: pw,
                email: email
            }
        }
    ).done(function (result) {

        var jResult = JSON.parse(result);
        var des = jResult['Destination'];
        if (typeof (des) != 'undefined') {
            // SAVE toke
            // MOVE ON TO ANOTHER SCREEN
            alert('User Created! Click ok to login');
            window.location = '../autho';
        
        } else {
            // UNABLE TO CREATE USER
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
