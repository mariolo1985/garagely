<?php
require '../frameworks/aws/aws-autoloader.php';
use Aws\CognitoIdentity\CognitoIdentityClient;
use Aws\Sts\StsClient;

class CognitoHelper
{
    private $sharedConfig = [
        'profile' => 'temp',
        'region'  => 'us-west-2',
        'version' => 'latest'
    ];

    // TEST METHOD DELETE ME
    function testFoobar(){
        return 'test';
    }



    /********** USER PROFILE **********/
    // CREATES USER IN COGNITO
    function createUser($Username, $Pw, $Email){

        try{
            $sdk = new Aws\Sdk($this->sharedConfig);

            // GET COGNITO CLIENT
            $cognitoClient = $sdk->createCognitoIdentityProvider();

            // CREATE USER
            $result = $cognitoClient->signUp([
                'ClientId' => '52d65o95sbnf1q9r49tpg349i9',
                'Username' => $Username,
                'Password' => $Pw,
                'UserAttributes' => [
                    [
                        'Name' => 'email',
                        'Value' => $Email
                    ]
                ]
            ]);
        }catch(Exception $e){
            return $e->getMessage();
        }

        return $result;
    }

    function getUserByName($Username){

    } 
    
}

?>