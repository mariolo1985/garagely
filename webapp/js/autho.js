window.onload = function () {
    
    $('.btn-login').click(function(){
        var un = $('.input-login').val();
        var pw = $('.input-pw').val();
        login(un,pw);
    });
}

function login(username, pw) {
    startLoader();
    $.ajax(
        {
            type: "POST",
            url: "http://54.201.24.33/cognitoservice/authouser.php",
            crossdomain:true,
            data:
            {
                un: username,
                pw: pw
            }
        }
    ).done(function (result) {
        var jResult = JSON.parse(result);
        var toke = jResult['AccessToken'];
        if (typeof(toke)!='undefined'){
            // SAVE toke
            // MOVE ON TO ANOTHER SCREEN
            window.location = '../';
            sessionStorage.setItem('toke',toke);
        }else{
            sessionStorage.setItem('toke','');
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


function startLoader(){
    $('.loader').removeClass('hide').addClass('show');
}

function stopLoader(){
    $('.loader').removeClass('show').addClass('hide');
}
