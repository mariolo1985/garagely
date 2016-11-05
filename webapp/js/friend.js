
function createFriend(user, pw) {

    $.ajax({
        type: "POST",
        url: "http://54.201.24.33/cognitoservice/createuser.php",
        crossDomain: true,
        dataType: "jsonp",
        data:
        {
            username: user,
            pw: pw
        }
    })
        .done(function (msg) {
            console.log('Post result: ' + msg);
        })
        .fail(function (a, b, c) {
            console.log(a);
            console.log(b);
            console.log(c);
        });


}