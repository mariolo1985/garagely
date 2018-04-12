<?php
session_start();
require '../frameworks/Facebook/autoload.php';
date_default_timezone_set('UTC');
class FBHelper{


    // LOGIN
    function login(){
       
        $fb = new Facebook\Facebook([
            'app_id' => '249543585464625',
            'app_secret' => '7fc4930ef8cd1cd2e02d100848f060fe',
            'default_graph_version' => 'v2.8'
        ]);

        $helper = $fb->getRedirectLoginHelper();
        $permissions = ['email'];

        try{
            $loginUrl = $helper->getLoginUrl('http://localhost:8888/temp/webservice/facebook/verifylogin.php', $permissions);
            return $loginUrl;
        }catch(Exception $e){
            return 'ERROR'; // FIX ME - BETTER ERROR HANDLING
        }
    }

    // GET TOKEN FROM SESSION
    function getUserAccessToken(){
        if (isset($_SESSION['fb_access_token'])){
            return $_SESSION['fb_access_token'];
        }else{
            return null;
        }
    }// end getUserAccessToken

    // GET BASIC USER INFO
    function getUserBasicInfo(){
        $fb = new Facebook\Facebook([
            'app_id' => '249543585464625',
            'app_secret' => '7fc4930ef8cd1cd2e02d100848f060fe',
            'default_graph_version' => 'v2.8'
        ]);

        $token = $this->getUserAccessToken();
        if (!$token == null){          
            try{
                $fb->setDefaultAccessToken($token);

                // GET USER INFO
                $requestUserInfo = $fb->request('GET','/me?fields=name,email');
                $requestUserPhoto = $fb->request('GET','/me/picture?redirect=false&type=large');

                $batch = [
                    'UserInfo' => $requestUserInfo,
                    'UserPicture' => $requestUserPhoto
                ];

                $responses = $fb->sendBatchRequest($batch);
            } catch(Facebook\Exceptions\FacebookResponseException $e) {
                echo 'Graph returned an error: ' . $e->getMessage();
                exit;
            } catch(Facebook\Exceptions\FacebookSDKException $e) {
                echo 'Facebook SDK returned an error: ' . $e->getMessage();
                exit;
            }

            $user = [];
            foreach ($responses as $key => $response){
                if ($response->isError()){
                    // FIX ME - NEED ERROR HANDLING
                }else{
                    $user[] = array(
                        $key => $response->getBody()
                    );
                }
            }//

            return $user;
        }
    }// end getUserBasicInfo

/*
    function setUserAccessTokenFromJS(){
        $fb = new Facebook\Facebook([
            'app_id' => '249543585464625',
            'app_secret' => '7fc4930ef8cd1cd2e02d100848f060fe',
            'default_graph_version' => 'v2.8'
        ]);

        $jsHelper = $fb->getJavaScriptHelper();
        try{
            // GET TOKEN FROM LOGIN REDIRECT
            $accessToken = $jsHelper->getAccessToken();
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            // FIX ME - ERROR HANDLING
            $hasError = true;
            // When Graph returns an error
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            // FIX ME - ERROR HANDLING
            $hasError = true;
            // When validation fails or other local issues
        }

        if (isset($accessToken)){
            // HAVE ACCESS TOKEN
            // OAuth 2.0 client
            $oAuth2Client = $fb->getOAuth2Client();
            // Token metadata
            $tokenMetadata = $oAuth2Client->debugToken($accessToken);

            try{
                // VALIDATE METADATA
                $tokenMetadata->validateAppId('249543585464625');
                $tokenMetadata->validateExpiration();
            }catch(Facebook\Exceptions\FacebookSDKException $e){
                //echo 'Validation Error: ' . $e->getMessage();
                // FIX ME - ERROR HANDLING
            }

            if (! $accessToken->isLongLived()){
                // EXCHANGE SHORT-LIVED TOKEN FOR LONG LIVED 
                try{
                    $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
                }catch(Facebook\Exceptions\FacebookSDKException $e){
                    //echo 'Error Getting long lived access token: ' . $e->getMessage();
                    $hasError = true;
                }
            }

            // HANDLE $hasError = true;
            if (!$hasError){
                $_SESSION['fb_access_token'] = (string) $accessToken;        
                return "SESSION_SUCCESS";        
            }else{
                return "ERROR";
            }

        }else{

            // FIX ME - COULD NOT GET TOKEN 
            if ($helper->getError()) {
                //header('HTTP/1.0 401 Unauthorized');
                //echo "Error: " . $helper->getError() . "\n";
                //echo "Error Code: " . $helper->getErrorCode() . "\n";
                //echo "Error Reason: " . $helper->getErrorReason() . "\n";
                //echo "Error Description: " . $helper->getErrorDescription() . "\n";
            } else {
                //header('HTTP/1.0 400 Bad Request');
                //echo 'Bad request';
            }
            return "ERROR";
        }
        
    }// end setUserAccessTokenFromJS
*/

    function setUserAccessTokenFromJS(){
        $fb = new Facebook\Facebook([
            'app_id' => '249543585464625',
            'app_secret' => '7fc4930ef8cd1cd2e02d100848f060fe',
            'default_graph_version' => 'v2.8'
        ]);

        
        try{
            $jsHelper = $fb->getJavaScriptHelper();
            // GET TOKEN FROM LOGIN REDIRECT
            $accessToken = $jsHelper->getAccessToken();

            if (isset($accessToken)){
                // HAVE ACCESS TOKEN
                // OAuth 2.0 client
                $oAuth2Client = $fb->getOAuth2Client();
                // Token metadata
                $tokenMetadata = $oAuth2Client->debugToken($accessToken);

                try{
                    // VALIDATE METADATA
                    $tokenMetadata->validateAppId('249543585464625');
                    $tokenMetadata->validateExpiration();
                }catch(Facebook\Exceptions\FacebookSDKException $e){
                    //echo 'Validation Error: ' . $e->getMessage();
                    // FIX ME - ERROR HANDLING
                }

                if (! $accessToken->isLongLived()){
                    // EXCHANGE SHORT-LIVED TOKEN FOR LONG LIVED 
                    try{
                        $accessToken = $oAuth2Client->getLongLivedAccessToken($accessToken);
                    }catch(Facebook\Exceptions\FacebookSDKException $e){
                        //echo 'Error Getting long lived access token: ' . $e->getMessage();
                        $hasError = true;
                    }
                }

                // HANDLE $hasError = true;
                if (!$hasError){
                    $_SESSION['fb_access_token'] = (string) $accessToken;        
                    //return "SESSION_SUCCESS";        
                }else{
                    //return "ERROR";
                }

            }else{

                // FIX ME - COULD NOT GET TOKEN 
                if ($helper->getError()) {
                    //header('HTTP/1.0 401 Unauthorized');
                    //echo "Error: " . $helper->getError() . "\n";
                    //echo "Error Code: " . $helper->getErrorCode() . "\n";
                    //echo "Error Reason: " . $helper->getErrorReason() . "\n";
                    //echo "Error Description: " . $helper->getErrorDescription() . "\n";
                } else {
                    //header('HTTP/1.0 400 Bad Request');
                    //echo 'Bad request';
                }
                return "ERROR";
            }
            
            return isset($accessToken) ? "IS_SET" : "NOT_SET";
        } catch(Facebook\Exceptions\FacebookResponseException $e) {
            // FIX ME - ERROR HANDLINg
            // When Graph returns an error
            return $e->getMessage();
        } catch(Facebook\Exceptions\FacebookSDKException $e) {
            // FIX ME - ERROR HANDLING
            // When validation fails or other local issues
            return $e->getMessage();
        }catch(Exception $e){
            return $e->getMessage();
        }

    }// end setUserAccessTokenFromJS
}
?>