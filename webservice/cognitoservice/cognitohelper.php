<?php
require '../frameworks/aws/aws-autoloader.php';
use Aws\CognitoIdentity\CognitoIdentityClient;
use Aws\Sts\StsClient;
use Aws\Credentials\CredentialProvider;

class CognitoHelper
{
    private $sharedConfig = [        
        'region'  => 'us-west-2',
        'version' => 'latest'
    ];


    /********** USER PROFILE **********/
    // CREATES USER IN COGNITO
    function createUser($Username, $Pw, $Email){
        try{
            $sdk = new Aws\Sdk($this->sharedConfig);
            // GET COGNITO CLIENT
            $cognitoClient = $sdk->createCognitoIdentityProvider(
                array(
                    'credentials' => CredentialProvider::ini('default','/var/www/html/.aws/credentials')
                )
            );

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
    }// end createuser

    // AUTHENTICATE USER 
    function authUser($Username,$PW){
        try{
            $sdk = new Aws\Sdk($this->sharedConfig);
            $cognitoClient = $sdk->createCognitoIdentityProvider(
                array(
                    'credentials' => CredentialProvider::ini('default','/var/www/html/.aws/credentials')
                )
            );

            $result = $cognitoClient->adminInitiateAuth([
                'AuthFlow' => 'ADMIN_NO_SRP_AUTH',
                'ClientId' =>'52d65o95sbnf1q9r49tpg349i9',
                'UserPoolId' =>'us-west-2_Z2gGGw2Am',
                'AuthParameters' => [
                    'USERNAME' => $Username,
                    'PASSWORD' => $PW
                ]
            ]);

            return $result;
        }catch(Exception $e){
            return $e->getMessage();
        }
    }// end authuser

    
}

?>