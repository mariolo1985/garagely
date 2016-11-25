// BASE FUNCTIONS

// AUTHO HELPERS
function handleToke(callbackHandler) {    
    var toke = getToke();

    if (toke != null) {
        $.ajax({
            url: 'http://54.201.24.33/cognitoservice/getuser.php',
            type: 'POST',
            data: {
                toke: toke
            }
        }).done(function (result) {
            var jResult = JSON.parse(result);
            console.log(jResult);
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