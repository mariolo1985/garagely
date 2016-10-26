//console.log(AmazonCognitoIdentity);
//console.log(AWSCognito);
var _signedInUser = null;

/************* USER PROFILES ***************/
// CREATE USER / RETURNS IF SUCCESSFUL
function createUser(Username, Pw, AttributeList) {
    var cognitoUser = null;
    var userPool = getUserPool();
    userPool.signUp(Username, Pw, AttributeList, null, function (err, result) {
        if (err) {
            // ERROR CREATING USER - DO something
            console.log(err);
            return;
        }

        cognitoUser = result.user;
    });

    return cognitoUser;
}

// RETURN USER OBJ BY [USERNAME]
function getUserByName(Username) {
    var userData = {
        Username: Username,
        Pool: getUserPool()
    };

    var cognitoUser = null;
    try {
        cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    } catch (e) {
        console.log(e);
    }

    return cognitoUser;
}

// AUTHENTICATION
function authUser(Username, Pw) {
    var authData = {
        Username: Username,
        Password: Pw
    };
    var authDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authData);
    var user = getUserByName(Username);
    user.authenticateUser(authDetails,
        {
            onSuccess: function (result) {
                // DO USER FUNCTIONS THAT REQUIRES AUTHENTICATION
                console.log(_signedInUser);
                console.log(result);

                _signedInUser = user;
                console.log(_signedInUser);
            },
            onFailure: function (err) {
                console.log(err);
            }
        });
}

/********* CONNECTIONS ***********/
// USER POOL CONNECTIONS
function getUserPoolData() {
    var poolData = {
        UserPoolId: 'us-west-2_Z2gGGw2Am',
        ClientId: '52d65o95sbnf1q9r49tpg349i9'
    };
    return poolData;
}

// RETURNS A USER POOL
function getUserPool() {
    var userPool = null;

    try {
        var poolData = getUserPoolData();
        userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(poolData);
    } catch (e) {
        console.log(e);
    }

    return userPool;
}

/********* ATTRIBUTES ********/
// CREATES AN ATTRIBUTE OBJECT
function createAttribute(key, value) {
    var attrPair = {
        Name: key,
        Value: value
    };
    var attribute = null;
    try {
        attribute = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(attrPair);
    } catch (e) {
        console.log(e);
    }

    return attribute;
}

// GET ATTRIBUTES

// SET ATTRIBUTE
function setUserAttribute(CognitoUser, Key, Value) {
    var attribute = createAttribute(Key, Value);
    CognitoUser.updateAttributes(attribute, function (err, result) {
        if (err) {
            return;
        }
    });
}

/*********REGISTRATION / CONFIRMATION CODE ********/
// RESEND A CONFIRMATION / REGISTRATION CODE
function sendCode(CognitoUser) {
    CognitoUser.resendConfirmationCode(function (err, result) {
        // IF UNABLE TO SEND THAN EXIT
        if (err) {
            console.log(err);
            return;
        }

    })
}

// CONFIRM CONFIRMATION / REGISTRATION CODEf
function confirmCode(CognitoUser, code) {
    CognitoUser.confirmRegistration(regKey, true, function (err, result) {
        if (err) {
            // CODE IS NOT VALID - DO something
            console.log(err);
            return;
        }
    });
}