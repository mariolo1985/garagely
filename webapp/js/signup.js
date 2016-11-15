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
        console.log(result);// FIX ME
        if (result == "UsernameExistsException") {
            console.log('User Name taken!');
        } else if (result == "InvalidPasswordException") {
            console.log('incorrect password strings');
        } else {
            var jResult = JSON.parse(result);
            if (jResult['DeliveryMedium']==="EMAIL"){
                console.log('CREATE SUCCES');
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
