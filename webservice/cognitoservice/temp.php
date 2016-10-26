<?php

//require '../frameworks/aws/aws-autoloader.php';
//use Aws\CognitoIdentity\CognitoIdentityClient;
//use Aws\Sts\StsClient;

require 'cognitohelper.php';

echo 'loading...';

try{
    $cognitoHelper = new CognitoHelper();

    echo 'Have cognito helper';
    //$result = $cognitoHelper->createUser("tempanother1","Overstock*","loserpunkx182@gmail.com");
    
    echo 'Created user: ' . $result;
/*
    // SHARED IN SDK
    $sharedConfig = [
        'profile' => 'temp',
        'region'  => 'us-west-2',
        'version' => 'latest'
    ];
    $sdk = new Aws\Sdk($sharedConfig);

    // GET COGNITO CLIENT
    $cognitoClient = $sdk->createCognitoIdentityProvider();
    $result = $cognitoClient->signUp([
        'ClientId' => '52d65o95sbnf1q9r49tpg349i9',
        'Username' => 'tempuser122',
        'Password' => 'Overstock*',
        'UserAttributes' => [
            [
                'Name' => 'email',
                'Value' => 'loserpunkx182@gmail.com'
            ]
        ]
    ]);
    echo $result.user;
*/
/*
    $idResp = $cognitoClient->getId(array(
        'AccountId' => '753815306341',
        'IdentityPoolId' => 'us-west-2:c77fdc33-3628-4540-ba7a-ab4a1fed49bd'
    ));
    $identityId = $idResp["IdentityId"];
    echo '<p>ID: ' . $identityId . "</p>";

    // GET OPEN ID TOKEN
    $tokenResp = $cognitoClient->getOpenIdToken(array(
        'IdentityId' => $identityId
    ));
    $token = $tokenResp["Token"];
    echo "<p>Token: " . $token . "</p>";

    // STS
    $stsClient = $sdk->createSts();
    $stsResp = $stsClient->assumeRoleWithWebIdentity(array(
        'RoleArn' => 'arn:aws:iam::753815306341:role/Cognito_GaragelyUserPoolAuth_Role',
        'RoleSessionName' => 'AppTestSession',
        'WebIdentityToken' => $token
    ));
    echo '<p>STS: ' . $stsResp['Credentials'] . '</p>';
*/

} catch (Exception $e) {    
    echo "<p>Error: " . $e->getMessage() . "</p>";
}

?>

