<?php
require '../frameworks/aws/aws-autoloader.php';
use Aws\CognitoIdentity\CognitoIdentityClient;
use Aws\Sts\StsClient;
use Aws\Credentials\CredentialProvider;
use Aws\Exception\AwsException;
use Aws\CognitoIdentityProvider\Exception\CognitoIdentityProviderException;


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
                'UserAttributes' => 
                    [
                        [
                            'Name' => 'email',
                            'Value' => $Email
                        ],
                        [
                            'Name' => 'custom:UserID',
                            'Value' => $Username
                        ],
                        [
                            'Name' => 'custom:HasAddress',
                            'Value' => 'FALSE'
                        ]
                    ]
            ]);
            return $result;
        }catch(CognitoIdentityProviderException $e){
            //echo $e->getMessage();// DEBUG
            return $e->getAwsErrorCode();
        }
        catch(Exception $e){      
            return $e->getMessage();
        }
        
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
        }catch(AwsException $e)
        {            
            //echo $e->getMessage();
            return $e->getAwsErrorCode();
        }
        catch(Exception $e){
            return $e;
        }
    }// end authuser

    // GETUSER 
        function getUser($un){
            // *****IDK IF IT WORKS*****
        date_default_timezone_set('UTC');

        try{
            $sdk = new Aws\Sdk($this->sharedConfig);
            $cognitoClient = $sdk->createCognitoIdentityProvider(
                array(
                    'credentials' => CredentialProvider::ini('default','/var/www/html/.aws/credentials')
                )
            );

            $result = $cognitoClient->adminGetUser([
                'UserPoolId' => 'us-west-2_Z2gGGw2Am',
                'Username' => $un,
            ]);

            return $result;
        }catch(AwsException $e)
        {             
            //echo $e->getMessage();
            return $e->getAwsErrorCode();
        }catch(Exception $e){
            // TO DO - HANDLE ERROR BETTER
            //echo $e->getMessage();
            return "EXCEPTION";
        }
    }

    function getUserByToke($toke){
        date_default_timezone_set('UTC');
        try{
            $sdk = new Aws\Sdk($this->sharedConfig);
            $cognitoClient = $sdk->createCognitoIdentityProvider(
                array(
                    'credentials' => CredentialProvider::ini('default','/var/www/html/.aws/credentials')
                )
            );

            $result = $cognitoClient->getUser([
                'AccessToken' => $toke         
            ]);

            return $result;
        }catch(AwsException $e)
        {             
            return $e->getAwsErrorCode();
        }catch(Exception $e){
            // TO DO - HANDLE ERROR BETTER
            return "EXCEPTION";
        }
    }

    // CONFIRM

    function confirmUser($clientId, $code, $un){
        try{
            $sdk = new Aws\Sdk($this->sharedConfig);
            $cognitoClient = $sdk->createCognitoIdentityProvider(
                array(
                    'credentials' => CredentialProvider::ini('default','/var/www/html/.aws/credentials')
                )
            );

            $result = $cognitoClient->confirmSignUp([
                'ClientId' => $clientId, 
                'ConfirmationCode' => $code, 
                'Username' => $un
            ]);
            return $result;
        }catch(Exception $e){
            return $e;
        }
    }// end cofirm user
}

?>