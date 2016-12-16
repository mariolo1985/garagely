/***** COGNITO  HELPERS *****/
// AUTHO HELPERS
function handleToke(callbackHandler) {
    var toke = getToke();

    if (toke != null) {
        $.ajax({
            url: '../cognitoservice/getuser.php',
            type: 'POST',
            data: {
                toke: toke
            }
        }).done(function (result) {
            var jResult = JSON.parse(result);
            jResult.forEach(function (item, i) {
                switch (item['Name']) {
                    case "custom:HasAddress":
                        var attrVal = item['Value'];
                        var hasAddress = attrVal === 'TRUE' ? true : false;
                        callbackHandler(hasAddress);
                        if (!hasAddress) {
                            //  POPUP ADDRESS
                            console.log('no address');

                        } else {
                            // HAVE ADDRESS
                            console.log('have address');
                        }
                        break;

                    default:
                        break;
                }

            });

        }).fail(function (a, b, c) {
            console.log('failed');
        })
    }
}


/***** FACEBOOK  HELPERS *****/
// LOAD FB SCRIPTS
function loadFB() {
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) { return; }
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk'));
}

// INIT FB API
function initFB() {
    FB.init({
        appId: '249543585464625',
        xfbml: false,
        cookie: true,
        status: true,
        version: 'v2.8'
    });
}

// CHECK LOGIN STATUS 
function getFBStatus(callback) {
    FB.getLoginStatus(function (loginStatus) {
        callback(loginStatus);
    })
}


function fbLogin(redirectOnSuccess, redirectUrl, redirectOnFail, failRedirectUrl) {
    //window.location = encodeURI("https://www.facebook.com/v2.8/dialog/oauth?app_id=249543585464625&redirect_uri=http://ec2-54-201-24-33.us-west-2.compute.amazonaws.com&scope=public_profile,email");
    FB.login(function (loginResult) {
        console.log(loginResult);
        if (loginResult.authResponse) {
            console.log("autho'd");
            if (!redirectOnSuccess) {
                window.location.reload();
            } else {
                window.location.href = redirectUrl;
            }
        } else {
            console.log('Cancel');
            if (redirectOnFail) {
                window.location.href = failRedirectUrl;
            }
        }
    },
        {
            scope: 'public_profile,email'
        });

}

function buildFBUserObj(result) {
    var userObj = JSON.parse(result);
    var user = {};
    userObj.map(function (element) {
        for (var key in element) {
            var data = JSON.parse(element[key]);

            switch (key) {
                case "UserInfo":
                    user.name = data.name;
                    user.email = data.email;
                    user.id = data.id;

                    break;
                case "UserPicture":
                    user.picUrl = data.data.url;
                    user.isSilo = data.data.is_silhouette;
                    break;
            }
        }
    });

    return user;
}