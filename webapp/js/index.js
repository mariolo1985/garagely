window.onload = function () {

    try {
        handleToke();
        loadMapsApi();

    } catch (e) {
        console.log(e);
    }
}

function handleToke() {
    var _sessionHelper = new SessionHelper()
    var toke = _sessionHelper.getToke();


    if (toke != null) {
        $.ajax({
            url: 'http://54.201.24.33/cognitoservice/getuser.php',
            type: 'POST',
            data: {
                toke: toke
            }
        }).done(function (result) {
            //console.log(result);
            var jResult = JSON.parse(result);
            console.log(jResult);
            jResult.forEach(function (item, i) {

                switch (item['Name']) {
                    case "custom:HasAddress":
                        var attrVal = item['Value'];
                        var hasAddress = attrVal === 'TRUE' ? true : false;
                        if (!hasAddress) {
                            //  POPUP ADDRESS
                            console.log('no address');

                        } else {
                            // HAVE ADDRESS

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